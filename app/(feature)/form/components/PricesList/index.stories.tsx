import { PricesList } from '.';
import { StoryObj, Meta } from '@storybook/react';
import { handlers } from '@/mocks/handlers/pricesList';

export default {
  title: 'app/feature/form/components/PricesList',
  component: PricesList,
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    msw: {
      handlers,
    },
  },
} satisfies Meta<typeof PricesList>;

type Story = StoryObj<typeof PricesList>;

export const Default: Story = {};
