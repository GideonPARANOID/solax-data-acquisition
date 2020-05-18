import { SolaxDb } from './db';
import { getUsefulData, getRTData } from './services';

export const poll = (solaxDb: SolaxDb) => async () => {
  const date = new Date();
  console.log(`poll ${date.toISOString()}`);

  const data = getUsefulData(await getRTData());

  console.log('poll.data', data);

  solaxDb.addMinutely(data);
};

export const generateDailyTotal = (solaxDb: SolaxDb) => async () => {
  const date = new Date();
  console.log(`generateDailyTotal ${date.toISOString()}`);

  const minutely = await solaxDb.getMinutelyForDay(date);

  console.log(minutely);
};
