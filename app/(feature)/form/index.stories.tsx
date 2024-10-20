import Page from './page';
import { StoryObj, Meta } from '@storybook/react';
import { handler } from '@/mocks/handlers/pricesList';

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
} as Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  parameters: {
    msw: {
      handler,
    },
  },
};
