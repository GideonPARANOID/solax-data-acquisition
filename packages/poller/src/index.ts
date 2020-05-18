import Agenda from 'agenda';
import { MongoClient } from 'mongodb';

import * as config from './config';
import { SolaxDb } from './db';
import { poll, generateDailyTotal } from './agenda-items';

(async () => {
  console.log('app', config);
  const agenda = new Agenda({ db: { address: config.agendaDb.url } });

  const client = await new MongoClient(config.db.url).connect();

  const db = new SolaxDb(client.db(config.db.name));

  agenda.define('poll', poll(db));
  agenda.define('generateDailyTotal', generateDailyTotal(db));

  await generateDailyTotal(db)();

  // await agenda.every('* * * * *', 'poll'); // every min
  // await agenda.every('0 0 * * *', 'generateDailyTotal'); // every day at midnight

  // await agenda.start();
})();
