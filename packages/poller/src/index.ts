import { MongoClient } from 'mongodb';

import * as config from './config';
import { getRealTimeData } from './services';

(async () => {
  const client = await new MongoClient(config.db.url).connect();

  const db = client.db(config.db.name);

  const data = await getRealTimeData();

  const collectionName = 'feed';

  await db.collection(collectionName).insertOne({ date: Date.now(), data });
})();
