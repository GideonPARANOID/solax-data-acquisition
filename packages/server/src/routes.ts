import { Express } from 'express';

import { ServerDb } from './db';
import { getRealTimeData } from './services';

export const current = (app: Express) =>
  app.get('/current', async (req, res) => {
    const data = await getRealTimeData();

    res.send(data);
  });

export const thisMinute = (app: Express, db: ServerDb) =>
  app.get('/this-minute', async (req, res) => {
    const data = await db.getMinute();

    res.send(data);
  });
