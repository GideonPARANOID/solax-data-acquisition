import { Statistic, Row, Col } from 'antd';
import React, { FunctionComponent } from 'react';

import { RecordStats } from 'solax-common/types';

export interface IStatsRecords {
  data: RecordStats;
}

export const StatsRecords: FunctionComponent<IStatsRecords> = ({
  data,
}: IStatsRecords) => (
  <Row>
    <Col span={4}>
      <Statistic title="Max day date" value={data.max.day.value / 1000} />
    </Col>
    <Col span={4}>
      <Statistic
        title="Max day power"
        value={data.max.day.value / 1000}
        suffix="kWh"
        precision={3}
      />
    </Col>
  </Row>
);
