import { extractStats, getRTData } from 'solax-common/services';

import { calcDayStats } from './aggregation';
import { PollerDb } from './poller-db';

export const pollMinutely = (pollerDb: PollerDb) => async () => {
  const date = new Date();
  console.log(`poll ${date.toISOString()}`);

  const data = extractStats(await getRTData());

  data.date.setSeconds(0, 0);

  console.log('poll.data', data);

  pollerDb.addMinutely(data);
};

export const generateDayStats = (pollerDb: PollerDb) => async () => {
  const date = new Date();
  console.log(`generateDayStats ${date.toISOString()}`);

  const minutely = await pollerDb.getMinutelyForDay(date);

  console.log(minutely);

  const dayStats = calcDayStats(date, minutely);

  console.log(dayStats);

  await pollerDb.updateDay(dayStats);
};
