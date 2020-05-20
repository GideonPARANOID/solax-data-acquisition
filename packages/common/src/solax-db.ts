import { Db } from 'mongodb';

export class SolaxDb {
  protected db: Db;

  collections = {
    minutely: 'minutely',
    daily: 'daily',
    records: 'records',
  };

  constructor(db: Db) {
    this.db = db;
  }
}
