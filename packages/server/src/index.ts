import cors from 'cors';

import express from 'express';

import { MongoClient } from 'mongodb';

import * as config from './config';

import * as routes from './routes';

import { ServerDb } from './server-db';

(async () => {
  const client = await new MongoClient(config.db.url).connect();
  const db = new ServerDb(client.db(config.db.name));

  const app = express();

  app.use(cors());

  Object.values(routes).forEach((route) => route(app, db));

  // start the Express server
  app.listen(config.serverPort, () =>
    console.log(`Server up & running on port ${config.serverPort}`)
  );
})();
