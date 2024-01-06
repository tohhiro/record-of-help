import React from 'react';
import Page from './page';

export default {
  title: 'app/feature/Form',
  component: Page,
};

export const Default = (): JSX.Element => {
  return <Page />;
};

Default.parameters = {
  nextjs: {
    appDirectory: true,
    navigation: {
      pathname: '/posts',
    },
  },
};
