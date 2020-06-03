import Agenda from 'agenda';
import { MongoClient } from 'mongodb';

import { pollMinutely, generateDayStats } from './agenda-items';
import * as config from './config';
import { PollerDb } from './poller-db';

(async () => {
  console.log('app', config);
  const agenda = new Agenda({ db: { address: config.agendaDb.url } });

  const client = await new MongoClient(config.db.url).connect();
  const db = new PollerDb(client.db(config.db.name));

  agenda.define('pollMinutely', pollMinutely(db));
  agenda.define('generateDayStats', generateDayStats(db));

  await agenda.every('* * * * *', 'pollMinutely'); // every min
  await agenda.every('0 0 * * *', 'generateDayStats'); // every day at midnight

  await agenda.start();
})();
