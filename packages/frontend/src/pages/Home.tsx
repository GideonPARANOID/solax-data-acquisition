import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import { DayStats } from 'solax-common/types';

import { AllDaysCalendar, Page, ChartDay, StatsDay } from '@/components';
import { useAxios } from '@/hooks';

export const Home: FunctionComponent = () => {
  const { date = new Date().toISOString().slice(0, 10) } = useParams();

  const [allDays] = useAxios('/day');
  const [today] = useAxios(`/day/${date}/minute`);

  const dayStats = allDays?.data?.find(
    (day: DayStats) => new Date(day.date).toISOString().slice(0, 10) === date
  );
  return (
    <Page title={date}>
      {allDays?.data && today?.data && (
        <>
          <ChartDay data={today.data} />
          <StatsDay data={dayStats} />
          <AllDaysCalendar date={new Date(date)} data={allDays.data} />
        </>
      )}
    </Page>
  );
};
