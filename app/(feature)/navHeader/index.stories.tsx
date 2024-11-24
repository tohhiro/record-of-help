import { Meta, StoryObj } from '@storybook/react';
import { NavHeader } from '.';

export default {
  title: 'app/feature/NavHeader',
  component: NavHeader,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof NavHeader>;

export type Story = StoryObj<typeof NavHeader>;

export const Default: Story = {};
