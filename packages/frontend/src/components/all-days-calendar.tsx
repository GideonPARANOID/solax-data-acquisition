import { Calendar } from 'antd';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { DayStats } from 'solax-common/types';

export interface IAllDaysCalendar {
  data: DayStats[];
}

export const AllDaysCalendar: FunctionComponent<IAllDaysCalendar> = ({
  data,
}: IAllDaysCalendar) => {
  const dateCellRender = (day) => {
    const stats = data.find(({ date }: DayStats) =>
      day.utc().isSame(date, 'day')
    );
    return stats ? (
      <Link to={`/date/${day.utc().toISOString().slice(0, 10)}`}>
        <b>Total:</b> {stats.total}
      </Link>
    ) : (
      <>No stats</>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};
