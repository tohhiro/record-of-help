import { Button, Props } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

const mockBaseData: Props = {
  label: 'Buttonラベル',
  type: 'button',
  intent: 'primary',
  onClick: () => {},
};

export const Default: Story = {
  args: mockBaseData,
};

export const Disabled: Story = {
  args: { ...mockBaseData, intent: 'disabled' },
};

export const Secondary: Story = {
  args: { ...mockBaseData, intent: 'secondary' },
};
