import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import { AllDaysCalendar, Page, ChartDay } from '@/components';
import { useAxios } from '@/hooks';

export const Home: FunctionComponent = () => {
  const { date = new Date().toISOString().slice(0, 10) } = useParams();

  const [allDays] = useAxios('/day');
  const [today] = useAxios(`/day/${date}/minute`);

  return (
    <Page title={date}>
      {allDays?.data && today?.data && (
        <>
          <ChartDay data={today.data} />
          <AllDaysCalendar data={allDays.data} />
        </>
      )}
    </Page>
  );
};
