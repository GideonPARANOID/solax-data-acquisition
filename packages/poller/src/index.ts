import Agenda from 'agenda';
import { MongoClient } from 'mongodb';

import * as config from './config';
import { SolaxDb } from './db';
import { pollMinutely, generateDailyStats } from './agenda-items';

(async () => {
  console.log('app', config);
  const agenda = new Agenda({ db: { address: config.agendaDb.url } });

  const client = await new MongoClient(config.db.url).connect();

  const db = new SolaxDb(client.db(config.db.name));

  agenda.define('pollMinutely', pollMinutely(db));
  agenda.define('generateDailyStats', generateDailyStats(db));

  await agenda.every('* * * * *', 'pollMinutely'); // every min
  await agenda.every('0 0 * * *', 'generateDailyStats'); // every day at midnight

  await agenda.start();
})();
