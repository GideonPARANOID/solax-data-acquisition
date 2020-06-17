import React, { FunctionComponent } from 'react';

import { Page, StatsRecords } from '@/components';
import { useAxios } from '@/hooks';

export const Records: FunctionComponent = () => {
  const [records] = useAxios('/records');

  return (
    <Page title={'Records'}>
      {records?.data && <StatsRecords data={records.data} />}
    </Page>
  );
};
