import { Meta, StoryObj } from '@storybook/react';
import { Input, Props } from '.';

export default {
  title: 'app/components/Input',
  component: Input,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

const baseMockData: Props = {
  id: 'input',
  label: 'Inputラベル',
  type: 'text',
  onClick: () => {},
};

export const Default: Story = {
  args: { ...baseMockData, disabled: false },
};

export const Password: Story = {
  args: { ...baseMockData, type: 'password', disabled: false },
};

export const Date: Story = {
  args: { ...baseMockData, type: 'date', disabled: false },
};

export const Disabled: Story = {
  args: { ...baseMockData, disabled: true },
};
