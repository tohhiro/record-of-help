import { Radio, Props } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/components/Radio',
  component: Radio,
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
