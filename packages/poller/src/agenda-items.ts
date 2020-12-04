import { extractStats, getRTData } from 'solax-common/services';
import { DayStats } from 'solax-common/types';

import { calcDayStats } from './aggregation';
import { PollerDB } from './poller-db';

export const updateRecords = async (pollerDB: PollerDB, day: DayStats) => {
  const records = await pollerDB.getRecords();
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
    await pollerDB.updateRecords(records);
  }
};

export const pollMinutely = (pollerDB: PollerDB) => async () => {
  const date = new Date();
  console.log(`pollMinutely ${date.toISOString()}`);

  const data = extractStats(await getRTData());

  data.date.setSeconds(0, 0);

  console.log('pollMinutely.data', data);

  await pollerDB.addMinutely(data);
};

export const generateDayStats = (pollerDB: PollerDB) => async () => {
  const date = new Date();
  console.log(`generateDayStats ${date.toISOString()}`);

  const minutely = await pollerDB.getMinutelyForDay(date);

  console.log('minutely', minutely);

  const day = calcDayStats(date, minutely);

  console.log('generateDayStats.day', day);

  await Promise.all([updateRecords(pollerDB, day), pollerDB.updateDay(day)]);
};
