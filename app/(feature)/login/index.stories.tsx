import { Meta, StoryObj } from '@storybook/react';
import Page from './page';

export default {
  title: 'app/feature/Login',
  component: Page,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
      },
    },
  },
} satisfies Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const Default: Story = {};
