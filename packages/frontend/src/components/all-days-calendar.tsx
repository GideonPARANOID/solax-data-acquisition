import { Calendar, Statistic } from 'antd';
import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { DayStats } from 'solax-common/types';

export interface IAllDaysCalendar {
  date: Date;
  data: DayStats[];
}

export const AllDaysCalendar: FunctionComponent<IAllDaysCalendar> = ({
  date: defaultValue,
  data,
}: IAllDaysCalendar) => {
  const dateCellRender = (day) => {
    const stats = data.find(({ date }: DayStats) =>
      day.utc().isSame(date, 'day')
    );

    if (stats) {
      return (
        <Link to={`/date/${day.utc().toISOString().slice(0, 10)}`}>
          <Statistic
            title={'Total energy'}
            value={stats.total / 1000}
            suffix="kWh"
            precision={3}
          />
        </Link>
      );
    }
    if (day < Date.now()) {
      return <Statistic title={'Total energy'} value={'N/A'} />;
    }
    return <></>;
  };

  const monthCellRender = (month) => {
    const days = data.filter(({ date }: DayStats) =>
      month.utc().isSame(date, 'month')
    );

    const stats = days.reduce(
      (sum: number, { total }: DayStats) => sum + total,
      0
    );

    if (days.length) {
      return (
        <Statistic
          title={'Total energy'}
          value={stats / 1000}
          suffix="kWh"
          precision={3}
        />
      );
    }
    if (month < Date.now()) {
      return <Statistic title={'Total energy'} value={'N/A'} />;
    }
    return <></>;
  };

  return (
    <Calendar
      defaultValue={moment(defaultValue)}
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};
