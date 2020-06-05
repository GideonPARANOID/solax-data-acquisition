import { Breadcrumb, Layout, Typography } from 'antd';
import React, { ReactChild, ReactChildren, FunctionComponent } from 'react';

const styles = {
  contentWrapper: {
    padding: '25px 50px',
  },
  content: {
    background: '#fff',
    padding: '24px',
  },
};

export interface IPage {
  title: string;
  children: ReactChild | ReactChildren;
}

export const Page: FunctionComponent<IPage> = ({ title, children }: IPage) => (
  <Layout>
    <Layout.Header>
      <Typography.Title>{title}</Typography.Title>
    </Layout.Header>
    <Layout.Content style={styles.contentWrapper}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <div style={styles.content}>{children}</div>
    </Layout.Content>
  </Layout>
);
