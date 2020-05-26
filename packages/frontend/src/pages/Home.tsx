import * as React from 'react';
import useAxios from 'axios-hooks';
import { Line } from 'react-chartjs-2';

const url = 'http://192.168.1.1:8081';

export const Home = () => {
  const [{ data }] = useAxios(`${url}/day`);

  const [today] = useAxios(`${url}/day/2020-05-26/minute`);

  let todayChart = <b>loading</b>;

  if (today.data) {
    const dat = {
      labels: today.data.map(({ date }) => date),
      datasets: [
        {
          label: 'power',
          data: today.data.map(({ pv }) => pv.power),
        },
      ],
    };

    todayChart = <Line data={dat} />;
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
