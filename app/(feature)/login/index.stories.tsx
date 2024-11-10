import Page from './page';
import { StoryObj, Meta } from '@storybook/react';

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
