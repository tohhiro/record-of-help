import { type Meta, type StoryObj } from '@storybook/react';
import { Checkbox } from '.';

export default {
  title: 'app/components/Checkbox',
  component: Checkbox,
  parameters: { chromatic: { disableSnapshot: true } },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { id: 'checkbox', label: 'Checkboxラベル', value: 'checkbox value', ref: null },
};
