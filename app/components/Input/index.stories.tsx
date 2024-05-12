import React from 'react';
import { Input, Props } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/components/Input',
  component: Input,
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

const baseMockData: Props = {
  id: 'input',
  label: 'Inputラベル',
  type: 'text',
  onClick: () => {},
};

export const Default: Story = {
  args: { ...baseMockData, disabled: false },
  render: (args) => <Input {...args} />,
};

export const Password: Story = {
  args: { ...baseMockData, type: 'password', disabled: false },
  render: (args) => <Input {...args} />,
};

export const Date: Story = {
  args: { ...baseMockData, type: 'date', disabled: false },
  render: (args) => <Input {...args} />,
};

export const Disabled: Story = {
  args: { ...baseMockData, disabled: true },
  render: (args) => <Input {...args} />,
};
