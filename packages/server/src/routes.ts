import { Express, Request, Response } from 'express';

import { getRTData } from 'solax-common/services';

import { ServerDb } from './db';

export const current = (app: Express) =>
  app.get('/current', async (req: Request, res: Response) =>
    res.send(await getRTData())
  );

export const thisMinute = (app: Express, db: ServerDb) =>
  app.get('/minute/now', async (req: Request, res: Response) =>
    res.send(await db.getMinute())
  );

export const allDays = (app: Express, db: ServerDb) =>
  app.get('/day/all', async (req: Request, res: Response) =>
    res.send(await db.getAllDays())
  );
