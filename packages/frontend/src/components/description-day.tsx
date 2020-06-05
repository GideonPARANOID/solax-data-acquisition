import { Descriptions } from 'antd';
import React, { FunctionComponent } from 'react';

import { DayStats } from 'solax-common/types';

import { format } from '@/utils';

export interface IDescriptionDay {
  data: DayStats;
}

export const DescriptionDay: FunctionComponent<IDescriptionDay> = ({
  data,
}: IDescriptionDay) => {
  console.log(data);
  return (
    <Descriptions title={data.date}>
      <Descriptions.Item label="Max minute time">
        {data.max.minute.date}
      </Descriptions.Item>
      <Descriptions.Item label="Max minute power">
        {format.power(data.max.minute.value)}
      </Descriptions.Item>
      <Descriptions.Item label="Max hour time">
        {data.max.hour.date}
      </Descriptions.Item>
      <Descriptions.Item label="Max hour energy">
        {format.energy(data.max.hour.value)}
      </Descriptions.Item>
    </Descriptions>
  );
};
