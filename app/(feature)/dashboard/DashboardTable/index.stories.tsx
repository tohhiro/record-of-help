import React from 'react';
import { DashboardTable, TdProps } from '.';

export default {
  title: 'app/feature/dashboard/DashboardTable',
  component: DashboardTable,
};

const mockThData = {
  comments: 'コメント',
  created_at: '作成日',
  curtain: 'カーテン',
  dish: '皿洗い',
  landry: '洗濯物',
  person: '氏名',
  prepareEat: '食事準備',
  special: 'スペシャル',
};
const mockTdData: TdProps = [
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

export const Default: React.FC = (): JSX.Element => {
  return <DashboardTable th={mockThData} td={mockTdData} />;
};
