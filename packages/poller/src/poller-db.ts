import { SolaxDb } from 'solax-common/solax-db';
import { MinuteStats, DayStats, RecordStats } from 'solax-common/types';

export class PollerDb extends SolaxDb {
  async addMinutely(data: MinuteStats): Promise<void> {
    await this.db.collection(this.collections.minute).insertOne(data);
  }

  async getMinutelyForDay(date: Date): Promise<MinuteStats[]> {
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    console.log(
      `between ${startDate.toISOString()} & ${endDate.toISOString()}`
    );

    const cursor = await this.db
      .collection(this.collections.minute)
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });

    return (await cursor.toArray())[0] || {
      max: {
        minute: { date: new Date(0), value: 0 },
        hour: { date: new Date(0), value: 0 },
        day: { date: new Date(0), value: 0 },
      },
    };
  }

  async updateDay(data: DayStats): Promise<void> {
    await this.db
      .collection(this.collections.day)
      .replaceOne({ date: data.date }, data);
  }

  async getRecords(): Promise<RecordStats> {
    const cursor = await this.db
      .collection(this.collections.records)
    .find({})

    retur cursor.toArray()
  }

  async updateRecords(data: RecordStats): Promise<void> {
    await this.db
      .collection(this.collections.records)
      .replaceOne({ }, data);
  }
}
