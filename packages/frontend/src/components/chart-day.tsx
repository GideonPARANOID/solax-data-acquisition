import React, { FunctionComponent } from 'react';
import { Line } from 'react-chartjs-2';

import { MinuteStats } from 'solax-common/types';

import { getTime, movingAverage } from '@/utils';

export interface IChartDay {
  data: MinuteStats[];
}

export const ChartDay: FunctionComponent<IChartDay> = ({ data }) => {
  const powerValues = data.map(({ pv }: MinuteStats) => pv.power);

  const chart = {
    labels: data.map(({ date }: MinuteStats) => getTime(new Date(date))),
    datasets: [
      {
        label: 'Power (watts)',
        data: powerValues,
      },
      {
        label: 'Hourly moving average power (watts) ',
        data: movingAverage(powerValues, 60),
      },
    ],
  };

  return <Line data={chart} />;
};
