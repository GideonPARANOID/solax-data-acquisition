import { Layout, Typography } from 'antd';
import React, { ReactChild, ReactChildren, FunctionComponent } from 'react';

export interface IPage {
  title: string;
  children: ReactChild | ReactChildren;
}

export const Page: FunctionComponent<IPage> = ({ title, children }: IPage) => (
  <Layout>
    <Layout.Header>
      <Typography.Title>{title}</Typography.Title>
    </Layout.Header>
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);
