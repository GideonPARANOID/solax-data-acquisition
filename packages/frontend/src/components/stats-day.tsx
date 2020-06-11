import { Statistic, Row, Col } from 'antd';
import React, { FunctionComponent } from 'react';

import { DayStats } from 'solax-common/types';

import { getTime } from '@/utils';

export interface IStatsDay {
  data: DayStats;
}

export const StatsDay: FunctionComponent<IStatsDay> = ({ data }: IStatsDay) => {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  const nextUpdate = date.setMinutes(0, 0, 0);

  return (
    <Row>
      <Col span={4}>
        <Statistic
          title="Total energy"
          value={data.total / 1000}
          suffix="kWh"
          precision={3}
        />
      </Col>
      <Col span={4}>
        <Statistic.Countdown
          title="Time until next update"
          value={nextUpdate}
          format="HH:mm:ss"
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="Max minute time"
          value={getTime(new Date(data.max.minute.date))}
          suffix="kW"
          precision={3}
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="Max minute power"
          value={data.max.minute.value / 1000}
          suffix="kW"
          precision={3}
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="Max hour time"
          value={getTime(new Date(data.max.hour.date))}
        />
      </Col>
      <Col span={4}>
        <Statistic
          title="Max hour energy"
          value={data.max.hour.value / 1000}
          suffix="kW"
          precision={3}
        />
      </Col>
    </Row>
  );
};
