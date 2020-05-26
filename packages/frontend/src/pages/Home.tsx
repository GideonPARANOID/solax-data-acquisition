import * as React from 'react';
import useAxios from 'axios-hooks';
import { LineChart, XAxis, YAxis, Line, CartesianGrid } from 'recharts';

const url = 'http://192.168.1.1:8081';

export const Home = () => {
  const [{ data }] = useAxios(`${url}/day`);

  const [more] = useAxios(`${url}/day/2020-05-26/minute`);

  let todayChart = (
    <b>loading</b>
  );

  if (more.data) {
    console.log('more',more);

    todayChart = (
      <LineChart width={1000} height={600} data={more.data}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="100 100"/>
        <Line type="monotone" dataKey="pv.power" stroke="#8884d8" />
        </LineChart>
    )
  }


  if (data) {
    console.log(data);
  }


  return (
    <div>
      <h1>Hello world!</h1>

      {todayChart}
      <ul>
        {data && data.map(({ date, total }) => (
          <li>{date} - {total}</li>
        ))}
      </ul>




  </div>
  );
};
