import Page from './page';
import { StoryObj, Meta } from '@storybook/react';
import { handlers } from '@/mocks/handlers/pricesList'; //

export default {
  title: 'app/feature/Form',
  component: Page,
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    msw: {
      handlers,
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/form',
      },
    },
  },
} satisfies Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const Default: Story = {};
