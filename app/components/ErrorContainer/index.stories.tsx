import { Meta, StoryObj } from '@storybook/react';
import { ErrorContainer } from '.';

export default {
  title: 'app/components/ErrorContainer',
  component: ErrorContainer,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies Meta<typeof ErrorContainer>;

type Story = StoryObj<typeof ErrorContainer>;

export const Default: Story = {
  args: { children: 'エラーメッセージ' },
};
