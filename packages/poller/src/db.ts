import { Db } from 'mongodb';

import { UsefulRTData, UsefulDailyData } from './types';

export class SolaxDb {
  private db: Db;

  collections = {
    minutely: 'minutely',
    daily: 'daily',
    records: 'records',
  };

  constructor(db: Db) {
    this.db = db;
  }

  async addMinutely(data: UsefulRTData): Promise<void> {
    await this.db.collection(this.collections.minutely).insertOne(data);
  }

  async getMinutelyForDay(date: Date): Promise<UsefulRTData[]> {
    const startDate = date.setHours(0, 0, 0, 0);
    const endDate = date.setHours(23, 59, 59, 999);

    console.log(
      `between ${new Date(startDate).toISOString()} & ${new Date(
        endDate
      ).toISOString()}`
    );

    const cursor = await this.db.collection(this.collections.minutely).find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    return cursor.toArray();
  }

  async addDaily(data: UsefulDailyData): Promise<void> {
    await this.db.collection(this.collections.daily).insertOne(data);
  }
}
