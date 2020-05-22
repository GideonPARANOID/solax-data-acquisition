import { SolaxDb } from 'solax-common/solax-db';
import { MinuteStats, DayStats } from 'solax-common/types';

export class PollerDb extends SolaxDb {
  async addMinutely(data: MinuteStats): Promise<void> {
    await this.db.collection(this.collections.minute).insertOne(data);
  }

  async getMinutelyForDay(date: Date): Promise<MinuteStats[]> {
    const startDate = date.setHours(0, 0, 0, 0);
    const endDate = date.setHours(23, 59, 59, 999);

    console.log(
      `between ${new Date(startDate).toISOString()} & ${new Date(
        endDate
      ).toISOString()}`
    );

    const cursor = await this.db.collection(this.collections.minute).find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    return cursor.toArray();
  }

  async addDay(data: DayStats): Promise<void> {
    await this.db.collection(this.collections.day).insertOne(data);
  }
}
