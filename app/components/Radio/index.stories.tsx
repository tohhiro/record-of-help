import { Meta, StoryObj } from '@storybook/react';
import { Props, Radio } from '.';

export default {
  title: 'app/components/Radio',
  component: Radio,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies Meta<typeof Radio>;

type Story = StoryObj<typeof Radio>;

const mockData: Props = {
  id: 'radio',
  label: 'radioラベル',
  value: 'radio',
};

export const Default: Story = {
  args: mockData,
};
