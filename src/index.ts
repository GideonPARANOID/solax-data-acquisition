import express from 'express';

import * as config from './config';
import { getRealTimeData } from './services';

const app = express();

app.get('/current', async (req, res) => {
  const data = await getRealTimeData();

  res.send(data);
});

// start the Express server
app.listen(config.serverPort, () => {
  console.log('test');
});
