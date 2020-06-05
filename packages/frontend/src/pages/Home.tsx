import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import { AllDaysCalendar, Page, ChartDay, DescriptionDay } from '@/components';
import { useAxios } from '@/hooks';

export const Home: FunctionComponent = () => {
  const { date = new Date().toISOString().slice(0, 10) } = useParams();

  const [allDays] = useAxios('/day');
  const [today] = useAxios(`/day/${date}/minute`);

  console.log(allDays);
  return (
    <Page title={date}>
      {allDays?.data && today?.data && (
        <>
          <ChartDay data={today.data} />
          <DescriptionDay data={allDays.data[allDays.data.length - 1]} />
          <AllDaysCalendar data={allDays.data} />
        </>
      )}
    </Page>
  );
};
