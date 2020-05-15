import * as dotenv from 'dotenv';

const parsed = dotenv.config().parsed;

const solaxURL = parsed.solax_url;

const serverPort =  8080;

export {
  solaxURL,
  serverPort
}
