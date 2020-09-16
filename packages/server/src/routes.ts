import { Express, Request, Response } from 'express';

import { getRTData } from 'solax-common/services';

import { ServerDb } from './server-db';

export const current = (app: Express) =>
  app.get('/current', async (req: Request, res: Response) =>
    res.send(await getRTData())
  );

export const getThisMinute = (app: Express, db: ServerDb) =>
  app.get('/minute/now', async (req: Request, res: Response) =>
    res.send(await db.getMinute())
  );

export const getAllDays = (app: Express, db: ServerDb) =>
  app.get('/day', async (req: Request, res: Response) =>
    res.send(await db.getAllDays())
  );

export const getDay = (app: Express, db: ServerDb) =>
  app.get('/day/:date', async ({ params }: Request, res: Response) =>
    res.send(await db.getDay(new Date(params.date)))
  );

export const getDayMinutes = (app: Express, db: ServerDb) =>
  app.get('/day/:date/minute', async ({ params }: Request, res: Response) =>
    res.send(await db.getDayMinutes(new Date(params.date)))
  );

export const getRecords = (app: Express, db: ServerDb) =>
  app.get('/records', async (req: Request, res: Response) =>
    res.send(await db.getRecords())
  );
