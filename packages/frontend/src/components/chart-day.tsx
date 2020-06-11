import { yellow } from '@ant-design/colors';
import React, { FunctionComponent } from 'react';
import { Line } from 'react-chartjs-2';

import { MinuteStats } from 'solax-common/types';

import { movingAverage } from '@/utils';

export interface IChartDay {
  data: MinuteStats[];
}

export const ChartDay: FunctionComponent<IChartDay> = ({ data }) => {
  const powerValues = data.map(({ pv }: MinuteStats) => pv.power / 1000);

  const chart = {
    labels: data.map(({ date }: MinuteStats) => new Date(date)),
    datasets: [
      {
        label: 'Power (Kilowatts)',
        data: powerValues,
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Hour moving average power (Kilowatts) ',
        data: movingAverage(powerValues, 60),
        backgroundColor: yellow.primary,
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
            displayFormats: {
              minute: 'hh:mm',
            },
          },
        },
      ],
    },
  };

  return <Line data={chart} options={options} />;
};
