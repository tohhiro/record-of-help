import { NavHeader } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/feature/NavHeader',
  component: NavHeader,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof NavHeader>;

export type Story = StoryObj<typeof NavHeader>;

export const Default: Story = {};
