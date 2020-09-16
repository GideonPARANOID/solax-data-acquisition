import { Db } from 'mongodb';

export class SolaxDb {
  protected db: Db;

  collections = {
    minute: 'minute',
    day: 'day',
    records: 'record',
  };

  constructor(db: Db) {
    this.db = db;
  }

  // eslint-disable-next-line class-methods-use-this
  protected getDayRangeQuery(date: Date): object {
    const next = new Date(date.getTime());
    next.setDate(new Date(date.getTime()).getDate() + 1);
    return {
      date: {
        $gt: date,
        $lte: next,
      },
    };
  }
}
