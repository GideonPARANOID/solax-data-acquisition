import * as React from 'react';
import useAxios from 'axios-hooks';

const url = 'http://localhost:8081/day/all';

export const Home = () => {
  const [{ data }] = useAxios(url);

  if (data) {
    console.log(data);
  }

  return <h1>Hello world!</h1>;
};
