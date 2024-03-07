import React from 'react';
import Page from './page';

export default {
  title: 'app/feature/Form',
  component: Page,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/form',
      },
    },
  },
};

export const Default = (): JSX.Element => {
  return <Page />;
};
