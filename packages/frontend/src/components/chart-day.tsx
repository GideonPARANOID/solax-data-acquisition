import React, { FunctionComponent } from 'react';
import { Line } from 'react-chartjs-2';

import { movingAverage } from '@/utils';
import { MinuteStats } from 'solax-common/types';

export interface IChartDay {
  data: MinuteStats[];
}

export const ChartDay: FunctionComponent<IChartDay> = ({ data }) => {
  const powerValues = data.map(({ pv }: MinuteStats) => pv.power);

  const chart = {
    labels: data.map(({ date }: MinuteStats) => new Date(date)),
    datasets: [
      {
        label: 'Power (watts)',
        data: powerValues,
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Hour moving average power (watts) ',
        data: movingAverage(powerValues, 60),
        backgroundColor: 'rgba(0, 0, 128, 0.5)',
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'minute',
            stepSize: 5,
          },
        },
      ],
    },
  };

  return <Line data={chart} options={options} />;
};
