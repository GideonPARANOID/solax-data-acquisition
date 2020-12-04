import * as dotenv from 'dotenv';

const { parsed } = dotenv.config();

/* eslint-disable-next-line camelcase */
const solaxURL = parsed?.solax_url;

/* eslint-disable-next-line camelcase */
const dbURL = parsed?.db_url;

const db = {
  url: dbURL,
  name: 'solax',
};

export { solaxURL, db };
