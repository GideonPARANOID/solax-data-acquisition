import { Db } from 'mongodb';

export class SolaxDb {
  protected db: Db;

  collections = {
    minute: 'minute',
    day: 'day',
    records: 'records',
  };

  constructor(db: Db) {
    this.db = db;
  }
}
