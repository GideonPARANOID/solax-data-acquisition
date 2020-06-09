import { Breadcrumb, Layout, Typography } from 'antd';
import React, { ReactChild, ReactChildren, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

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
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="#">{title}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div style={styles.content}>{children}</div>
    </Layout.Content>
  </Layout>
);
