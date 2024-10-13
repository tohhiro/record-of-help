import Page from './page';
import { StoryObj, Meta } from '@storybook/react';
import { handlers } from '@/mocks/handler/pricesList'; //

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

export const Default: Story = {};

Default.parameters = {
  msw: {
    handlers,
  },
};
