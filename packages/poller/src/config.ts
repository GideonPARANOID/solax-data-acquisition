import * as dotenv from 'dotenv';

const parsed = dotenv.config().parsed;

const solaxURL = parsed.solax_url;

const agendaDb = {
  url: parsed.db_url,
};

const db = {
  url: parsed.db_url,
  name: 'solax',
  collection: 'feed',
};

export { solaxURL, agendaDb, db };
