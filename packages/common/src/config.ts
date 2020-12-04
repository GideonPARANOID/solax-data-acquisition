import * as dotenv from 'dotenv';

const { parsed } = dotenv.config();

const solaxURL = parsed?.solax_url;

const db = {
  url: parsed?.db_url,
  name: 'solax',
};

export { solaxURL, db };
