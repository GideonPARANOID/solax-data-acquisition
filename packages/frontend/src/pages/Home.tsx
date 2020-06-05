import React, { FunctionComponent } from 'react';

import { AllDaysCalendar, Page, ChartDay } from '@/components';
import { useAxios } from '@/hooks';

export const Home: FunctionComponent = () => {
  const [allDays] = useAxios('/day');
  const [today] = useAxios(
    `/day/${new Date().toISOString().slice(0, 10)}/minute`
  );

  return (
    <Page title={'Welcome'}>
      {allDays?.data && today?.data && (
        <>
          <ChartDay data={today.data} />
          <AllDaysCalendar data={allDays.data} />
        </>
      )}
    </Page>
  );
};
