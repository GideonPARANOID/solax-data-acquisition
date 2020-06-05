import { Statistic, Row, Col } from 'antd';
import React, { FunctionComponent } from 'react';

import { DayStats } from 'solax-common/types';

import { getTime } from '@/utils';

export interface IStatsDay {
  data: DayStats;
}

export const StatsDay: FunctionComponent<IStatsDay> = ({ data }: IStatsDay) => (
  <Row>
    <Col span={6}>
      <Statistic
        title="Max minute time"
        value={getTime(new Date(data.max.minute.date))}
      />
    </Col>
    <Col span={6}>
      <Statistic
        title="Max minute power"
        value={data.max.minute.value / 1000}
        suffix="kW"
        precision={3}
      />
    </Col>
    <Col span={6}>
      <Statistic
        title="Max hour time"
        value={getTime(new Date(data.max.hour.date))}
      />
    </Col>
    <Col span={6}>
      <Statistic
        title="Max hour energy"
        value={data.max.hour.value / 1000}
        suffix="kW"
        precision={3}
      />
    </Col>
  </Row>
);
