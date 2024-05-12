import React from 'react';
import { Button, Props } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/components/Button',
  component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

const mockBaseData: Props = {
  label: 'Buttonラベル',
  type: 'button',
  style: 'primary',
  onClick: () => {},
  disabled: false,
};

export const Default: Story = {
  args: mockBaseData,
  render: (args) => <Button {...args} />,
};

export const Disabled: Story = {
  args: { ...mockBaseData, disabled: true },
  render: (args) => <Button {...args} />,
};

export const Secondary: Story = {
  args: { ...mockBaseData, style: 'secondary' },
  render: (args) => <Button {...args} />,
};
