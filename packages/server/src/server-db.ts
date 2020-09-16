import { SolaxDb } from 'solax-common/solax-db';
import { MinuteStats, DayStats, RecordStats } from 'solax-common/types';

export class ServerDb extends SolaxDb {
  async getMinute(date: Date = new Date()): Promise<MinuteStats> {
    const startOfMinute = date.setSeconds(0, 0);

    const cursor = await this.db
      .collection(this.collections.minute)
      .find({ date: startOfMinute });
    return (await cursor.toArray())[0];
  }

  async getAllDays(): Promise<DayStats[]> {
    const cursor = await this.db.collection(this.collections.day).find({});
    return cursor.toArray();
  }

  async getDay(date: Date): Promise<MinuteStats[]> {
    console.log(this.getDayRangeQuery(date));
    const cursor = await this.db
      .collection(this.collections.day)
      .find(this.getDayRangeQuery(date));
    return cursor.toArray();
  }

  async getDayMinutes(date: Date): Promise<MinuteStats[]> {
    const cursor = await this.db
      .collection(this.collections.minute)
      .find(this.getDayRangeQuery(date));
    return cursor.toArray();
  }

  async getRecords(): Promise<RecordStats> {
    const cursor = await this.db.collection(this.collections.records).find({});
    return (await cursor.toArray())[0];
  }
}
