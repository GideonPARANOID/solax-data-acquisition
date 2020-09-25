import { extractStats, getRTData } from 'solax-common/services';
import { DayStats } from 'solax-common/types';

import { calcDayStats } from './aggregation';
import { PollerDb } from './poller-db';

const updateRecords = async (pollerDb: PollerDb, day: DayStats) => {
  const records = await pollerDb.getRecords();
  let brokenRecord = false;

  if (day.max.minute.value > records.max.minute.value) {
    records.max.minute = day.max.minute;
    brokenRecord = true;
  }

  if (day.max.hour.value > records.max.hour.value) {
    records.max.hour = day.max.hour;
    brokenRecord = true;
  }

  if (day.total > records.max.day.value) {
    records.max.day = {
      date: day.date,
      value: day.total,
    };
    brokenRecord = true;
  }

  if (brokenRecord) {
    await pollerDb.updateRecords(records);
  }
};

export const pollMinutely = (pollerDb: PollerDb) => async () => {
  const date = new Date();
  console.log(`pollMinutely ${date.toISOString()}`);

  const data = extractStats(await getRTData());

  data.date.setSeconds(0, 0);

  console.log('pollMinutely.data', data);

  pollerDb.addMinutely(data);
};

export const generateDayStats = (pollerDb: PollerDb) => async () => {
  const date = new Date();
  console.log(`generateDayStats ${date.toISOString()}`);

  const minutely = await pollerDb.getMinutelyForDay(date);

  console.log('minutely', minutely);

  const day = calcDayStats(date, minutely);

  console.log('generateDayStats.day', day);

  await Promise.all([updateRecords(pollerDb, day), pollerDb.updateDay(day)]);
};
