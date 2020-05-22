import express from 'express';
import { MongoClient } from 'mongodb';

import * as config from './config';
import { ServerDb } from './db';
import * as routes from './routes';

(async () => {
  const client = await new MongoClient(config.db.url).connect();
  const db = new ServerDb(client.db(config.db.name));

  const app = express();

  Object.values(routes).forEach((route) => route(app, db));

  // start the Express server
  app.listen(config.serverPort, () => {
    console.log('test');
  });
})();
