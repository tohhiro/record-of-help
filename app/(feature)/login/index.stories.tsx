import React from 'react';
import Page from './page';
import { StoryObj, Meta } from '@storybook/react';

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
} as Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: () => <Page />,
};
