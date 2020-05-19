import { SolaxDb } from './db';
import { getUsefulData, getRTData } from './services';
import { calcDailyStats } from './aggregation';

export const pollMinutely = (solaxDb: SolaxDb) => async () => {
  const date = new Date();
  console.log(`poll ${date.toISOString()}`);

  const data = getUsefulData(await getRTData());

  console.log('poll.data', data);

  solaxDb.addMinutely(data);
};

export const generateDailyStats = (solaxDb: SolaxDb) => async () => {
  const date = new Date();
  console.log(`generateDailyStats ${date.toISOString()}`);

  const minutely = await solaxDb.getMinutelyForDay(date);

  console.log(minutely);

  const dailyStats = calcDailyStats(date.getTime(), minutely);

  console.log(dailyStats);

  await solaxDb.addDaily(dailyStats);
};
