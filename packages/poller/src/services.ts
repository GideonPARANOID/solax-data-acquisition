import axios, { AxiosResponse } from 'axios';

import { RealTimeAPI, RealTimeData, UsefulRealTimeData } from './types';
import * as config from './config';

const unmarshallRealTimeData = ({
  Data: data,
  Information: info,
  ver,
  type,
}: RealTimeAPI): RealTimeData => ({
  pv: [
    {
      current: data[0],
      voltage: data[2],
      power: data[11],
    },
    {
      current: data[1],
      voltage: data[3],
      power: data[12],
    },
  ],
  grid: {
    current: data[4],
    voltage: data[5],
    power: data[6],
    frequency: data[50],
    energyTo: data[41],
    energyFrom: data[42],
  },
  battery: {
    current: data[14],
    voltage: data[13],
    power: data[15],
    temperature: data[16],
    capacity: data[18],
  },
  solar: {
    today: data[8],
    total: data[9],
  },
  eps: {
    current: data[54],
    voltage: data[53],
    frequency: data[56],
    va: data[55],
  },
  feedIn: {
    power: data[10],
  },
  status: data[68],
  temperature: data[7],
  meta: {
    type,
    version: ver,
    systemMax: Number(info[6]),
  },
  units: {
    current: { name: 'Amperes', short: 'A' },
    power: { name: 'Watts', short: 'W' },
    voltage: { name: 'Volts', short: 'V' },
    frequency: { name: 'Hertz', short: 'Hz' },
  },
});

export const getRealTimeData = async () => {
  console.log(`${config.solaxURL}/?optType=ReadRealTimeData`);
  const { data }: AxiosResponse<RealTimeAPI> = await axios.post(
    `${config.solaxURL}/?optType=ReadRealTimeData`
  );

  console.log(data);

  return unmarshallRealTimeData(data);
};

export const getUsefulData = ({
  pv,
  solar,
  temperature,
}: RealTimeData): UsefulRealTimeData => ({
  pv: pv[0],
  solar,
  temperature,
});
