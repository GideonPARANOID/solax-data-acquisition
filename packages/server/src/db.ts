import { SolaxDb } from 'solax-common/solax-db';
import { MinuteStats, DayStats } from 'solax-common/types';

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
}
