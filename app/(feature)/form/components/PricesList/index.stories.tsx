import { PricesList } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/feature/form/components/PricesList',
  component: PricesList,
} as Meta<typeof PricesList>;

type Story = StoryObj<typeof PricesList>;

export const Default: Story = {};
