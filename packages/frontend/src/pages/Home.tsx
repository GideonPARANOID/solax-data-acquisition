import React, { FunctionComponent } from 'react';

import { ChartDay } from '@/components';
import { useAxios } from '@/hooks';

export const Home: FunctionComponent = () => {
  const [allDays] = useAxios('/day');
  const [today] = useAxios(
    `/day/${new Date().toISOString().slice(0, 10)}/minute`
  );

  return (
    <div>
      <h1>Hello world!</h1>

      {allDays?.data && today?.data && (
        <>
          <ChartDay data={today.data} />
          <ul>
            {allDays.data.map(({ date, total }) => (
              <li key={date}>
                {date} - {total}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
