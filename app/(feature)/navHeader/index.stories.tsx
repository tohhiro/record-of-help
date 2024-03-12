import React from 'react';
import { NavHeader } from '.';

export default {
  title: 'app/feature/NavHeader',
  component: NavHeader,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Default = (): JSX.Element => {
  return <NavHeader />;
};
