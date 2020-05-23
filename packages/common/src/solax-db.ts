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
}
