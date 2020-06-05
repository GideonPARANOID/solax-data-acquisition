import { Calendar } from 'antd';
import React, { FunctionComponent } from 'react';

import { DayStats } from 'solax-common/types';

export interface IAllDaysCalendar {
  data: DayStats[];
}

export const AllDaysCalendar: FunctionComponent<IAllDaysCalendar> = ({
  data,
}: IAllDaysCalendar) => {
  const dateCellRender = (day) => {
    const stats = data.find(({ date }: DayStats) => day.utc().isSame(date, 'day'));
    return stats ? (
      <>
        <b>Total:</b> {stats.total}
      </>
    ) : (
      <>No stats</>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};
