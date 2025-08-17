import { handlers } from '@/mocks/handlers/pricesList';
import { type Meta, type StoryObj } from '@storybook/react';
import { PricesList } from '.';

export default {
  title: 'app/feature/form/components/PricesList',
  component: PricesList,
  parameters: { chromatic: { disableSnapshot: false }, msw: { handlers } },
} satisfies Meta<typeof PricesList>;

type Story = StoryObj<typeof PricesList>;

export const Default: Story = {};
