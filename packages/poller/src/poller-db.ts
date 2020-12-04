import { SolaxDB } from 'solax-common/solax-db';
import { MinuteStats, DayStats, RecordStats } from 'solax-common/types';

export class PollerDB extends SolaxDB {
  async addMinutely(data: MinuteStats): Promise<void> {
    await this.db.collection(this.collections.minute).insertOne(data);
  }

  async getMinutelyForDay(date: Date): Promise<MinuteStats[]> {
    const cursor = await this.db
      .collection(this.collections.minute)
      .find(this.getDayRangeQuery(date));

    return cursor.toArray();
  }

  async updateDay(data: DayStats): Promise<void> {
    await this.db
      .collection(this.collections.day)
      .replaceOne({ date: data.date }, data);
  }

  async getRecords(): Promise<RecordStats> {
    const cursor = await this.db.collection(this.collections.records).find({});

    return (
      (await cursor.toArray())[0] || {
        max: {
          minute: { date: new Date(0), value: 0 },
          hour: { date: new Date(0), value: 0 },
          day: { date: new Date(0), value: 0 },
        },
      }
    );
  }

  async updateRecords(data: RecordStats): Promise<void> {
    await this.db.collection(this.collections.records).replaceOne({}, data);
  }
}
