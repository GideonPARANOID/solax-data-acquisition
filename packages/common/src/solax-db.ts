import { Db } from 'mongodb';

export class SolaxDb {
  protected db: Db;

  collections = {
    minute: 'minutely',
    day: 'daily',
    records: 'records',
  };

  constructor(db: Db) {
    this.db = db;
  }
}
