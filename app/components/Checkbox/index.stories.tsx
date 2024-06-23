import { Checkbox } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/components/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: 'checkbox',
    label: 'Checkboxラベル',
    value: 'checkbox value',
    ref: null,
  },
};
