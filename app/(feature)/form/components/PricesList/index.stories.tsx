import { PricesList } from '.';
import { StoryObj, Meta } from '@storybook/react';
import { handlers } from '@/mocks/handler/pricesList';

export default {
  title: 'app/feature/form/components/PricesList',
  component: PricesList,
} as Meta<typeof PricesList>;

type Story = StoryObj<typeof PricesList>;

export const Default: Story = {};

Default.parameters = {
  msw: {
    handlers,
  },
};
