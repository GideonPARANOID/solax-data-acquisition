import { SolaxDb } from 'solax-common/solax-db';
import { UsefulRTData } from 'solax-common/types';

export class ServerDb extends SolaxDb {
  async getMinute(date: Date = new Date()): Promise<UsefulRTData> {
    const startOfMinute = date.setSeconds(0, 0);

    const cursor = await this.db
      .collection(this.collections.minutely)
      .find({ date: startOfMinute });
    return (await cursor.toArray())[0];
  }
}
