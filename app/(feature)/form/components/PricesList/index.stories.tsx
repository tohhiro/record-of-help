import { PricesList } from '@/app/(feature)/form/components/PricesList';
import { handlers } from '@/mocks/handlers/pricesList';
import { Meta, StoryObj } from '@storybook/react';

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
