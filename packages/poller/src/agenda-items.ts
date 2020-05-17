import { Db } from 'mongodb';

import { getUsefulData, getRealTimeData } from './services';

export const poll = (db: Db) => async () => {
  const date = Date.now();
  console.log('poll', date);

  const data = getUsefulData(await getRealTimeData());

  const collectionName = 'feed';

  console.log('poll.data', data);

  await db.collection(collectionName).insertOne({ date, data });
};

export const generateDailyTotal = () => () => {
  const date = Date.now();
  console.log('generateDailyTotal', date);
};
