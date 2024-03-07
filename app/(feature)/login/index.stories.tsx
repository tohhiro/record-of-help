import React from 'react';
import Page from './page';

export default {
  title: 'app/feature/Login',
  component: Page,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
      },
    },
  },
};

export const Default = (): JSX.Element => {
  return <Page />;
};
