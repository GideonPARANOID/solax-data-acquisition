import { MinuteStats, DayStats, Record } from 'solax-common/types';

export const calcDayStats = (
  dayDate: Date,
  minutelyData: MinuteStats[]
): DayStats => {
  const getSumPvPower = (data: MinuteStats[]) =>
    data.reduce((sum, { pv }: MinuteStats): number => sum + pv.power / 60, 0);

  const total = getSumPvPower(minutelyData);

  const minute = minutelyData.reduce(
    (max: Record, { date, pv }: MinuteStats): Record =>
      pv.power > max.value ? { date, value: pv.power } : max,
    { date: dayDate, value: 0 }
  );

  // sliding window total
  const window = 60;
  const hour = minutelyData
    .slice(0, minutelyData.length - (window - 1))
    .map(
      ({ date }: MinuteStats, index: number): Record => ({
        date,
        value: getSumPvPower(minutelyData.slice(index, index + window)),
      })
    )
    .reduce(
      (max: Record, current: Record): Record =>
        current.value > max.value ? current : max,
      { date: dayDate, value: 0 }
    );

  return { date: dayDate, total, max: { minute, hour } };
};
