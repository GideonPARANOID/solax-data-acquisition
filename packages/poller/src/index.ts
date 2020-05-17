import Agenda from 'agenda';
import { MongoClient } from 'mongodb';

import * as config from './config';
import { poll, generateDailyTotal } from './agenda-items';

(async () => {
  console.log('app', config);
  const agenda = new Agenda({ db: { address: config.agendaDb.url } });

  const client = await new MongoClient(config.db.url).connect();

  const db = client.db(config.db.name);

  agenda.define('poll', poll(db));
  agenda.define('generateDailyTotal', generateDailyTotal());

  await agenda.start();
  await agenda.every('1 minute', 'poll');
  await agenda.every('1 day', 'generateDailyTotal');
})();
