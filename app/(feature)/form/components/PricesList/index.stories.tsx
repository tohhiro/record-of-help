import { mockPricesListRaw } from '@/mocks/pricesList';
import { type Meta, type StoryObj } from '@storybook/react';
import { PricesList } from '.';

export default {
  title: 'app/feature/form/components/PricesList',
  component: PricesList,
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta<typeof PricesList>;

type Story = StoryObj<typeof PricesList>;

export const Default: Story = {
  args: {
    pricesList: mockPricesListRaw.data,
    register: {
      name: 'items.helps',
      onChange: async () => {},
      onBlur: async () => {},
      ref: () => {},
    },
  },
};
