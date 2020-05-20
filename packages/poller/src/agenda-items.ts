import { PollerDb } from './db';
import { getUsefulData, getRTData } from './services';
import { calcDailyStats } from './aggregation';

export const pollMinutely = (pollerDb: PollerDb) => async () => {
  const date = new Date();
  console.log(`poll ${date.toISOString()}`);

  const data = getUsefulData(await getRTData());

  console.log('poll.data', data);

  pollerDb.addMinutely(data);
};

export const generateDailyStats = (pollerDb: PollerDb) => async () => {
  const date = new Date();
  console.log(`generateDailyStats ${date.toISOString()}`);

  const minutely = await pollerDb.getMinutelyForDay(date);

  console.log(minutely);

  const dailyStats = calcDailyStats(date.getTime(), minutely);

  console.log(dailyStats);

  await pollerDb.addDaily(dailyStats);
};
