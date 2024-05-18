import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { DashboardTable, Props } from '.';

export default {
  title: 'app/feature/dashboard/DashboardTable',
  component: DashboardTable,
} as Meta<typeof DashboardTable>;

type Story = StoryObj<typeof DashboardTable>;

const mockThData = {
  person: '氏名',
  dish: '皿洗い',
  curtain: 'カーテン開閉',
  landry: '洗濯物',
  prepareEat: '食事準備',
  special: 'スペシャル',
  comments: 'コメント',
  created_at: '日付',
};
const mockTdData: Props = [
  {
    comments: null,
    created_at: '2024-1-2',
    curtain: 100,
    del_flag: false,
    dish: 10,
    id: '1',
    landry: 20,
    person: 'eito',
    prepareEat: 20,
    special: 5,
  },
  {
    comments: null,
    created_at: '2024-1-2',
    curtain: 100,
    del_flag: false,
    dish: 10,
    id: '1',
    landry: 20,
    person: 'mei',
    prepareEat: 20,
    special: 5,
  },
];

export const Default: Story = {
  args: { th: mockThData, td: mockTdData },
  render: (args) => <DashboardTable {...args} />,
};
