import { UsefulRTData, Record } from './types';

export const getDailyTotals = (minutelyData: UsefulRTData[]) => {
  const getSumPvPower = (data: UsefulRTData[]) =>
    data.reduce((sum, { pv }: UsefulRTData): number => sum + pv.power / 60, 0);

  const total = getSumPvPower(minutelyData);

  const minute = minutelyData.reduce(
    (max: number, { pv }: UsefulRTData): number => (pv.power > max ? pv.power : max),
    0
  );

  // sliding window total
  const window = 60;
  const hour = minutelyData
    .slice(0, minutelyData.length - (window - 1))
    .map(({ date }: UsefulRTData, index: number): Record => ({
      date,
      value: getSumPvPower(minutelyData.slice(index, index + window)),
    }))
    .reduce(
      (max: Record, current: Record): Record =>
        current.value > max.value ? current : max,
      { date: 0, value: 0 }
    );

  return { total, max: { minute, hour } };
};
