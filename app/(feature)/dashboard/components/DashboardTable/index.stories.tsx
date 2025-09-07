import { mockRawsData } from '@/mocks/rawsData';
import { mockThData } from '@/mocks/tableHeader';
import { type Meta, type StoryObj } from '@storybook/react';
import { DashboardTable } from '.';

export default {
  title: 'app/feature/dashboard/DashboardTable',
  component: DashboardTable,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta<typeof DashboardTable>;

type Story = StoryObj<typeof DashboardTable>;

export const Default: Story = { args: { th: mockThData, td: mockRawsData.data } };
