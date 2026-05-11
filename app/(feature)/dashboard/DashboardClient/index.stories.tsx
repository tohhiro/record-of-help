import { type Meta, type StoryObj } from '@storybook/react';
import { DashboardClient } from '.';

export default {
  title: 'app/feature/DashboardClient',
  component: DashboardClient,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  args: {
    memberOptions: [
      { value: 'all', label: 'All' },
      { value: 'eito', label: 'eito' },
      { value: 'mei', label: 'mei' },
      { value: 'tohhiro', label: 'tohhiro' },
    ],
  },
} satisfies Meta<typeof DashboardClient>;

type Story = StoryObj<typeof DashboardClient>;

export const Default: Story = {};
