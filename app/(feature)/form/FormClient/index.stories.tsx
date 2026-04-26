import { mockPricesListRaw } from '@/mocks/pricesList';
import { type Meta, type StoryObj } from '@storybook/react';
import { FormClient } from '.';

export default {
  title: 'app/feature/Form',
  component: FormClient,
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/form',
      },
    },
  },
} satisfies Meta<typeof FormClient>;

type Story = StoryObj<typeof FormClient>;

export const Default: Story = {
  args: {
    pricesList: mockPricesListRaw.data,
  },
};
