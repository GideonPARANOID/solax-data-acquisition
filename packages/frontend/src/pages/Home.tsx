import React, { FunctionComponent } from 'react';
import useAxios from 'axios-hooks';

import { ChartDay } from '@/components';

const url = 'http://192.168.1.1:8081';

export const Home: FunctionComponent = () => {
  const [{ data }] = useAxios(`${url}/day`);

  const [today] = useAxios(`${url}/day/2020-05-26/minute`);

  let todayChart = <b>loading</b>;

  if (today.data) {
    todayChart = <ChartDay data={today.data} />;
  }

  if (data) {
    console.log(data);
  }

  return (
    <div>
      <h1>Hello world!</h1>

      {todayChart}
      <ul>
        {data &&
          data.map(({ date, total }) => (
            <li key={date}>
              {date} - {total}
            </li>
          ))}
      </ul>
    </div>
  );
};
