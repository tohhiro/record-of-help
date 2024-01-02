import React from 'react';
import { Table, Props } from '.';

export default {
  title: 'app/components/Table',
  component: Table,
};

export const Default: React.FC = (): JSX.Element => {
  const mockData: Props[] = [
    {
      id: '1',
      person: 'taro',
      curtain: 100,
      dish: 0,
      landry: 0,
      prepareEat: 20,
      towel: 0,
      comments: null,
      created_at: '2024-1-2',
      del_flag: false,
    },
    {
      id: '2',
      person: 'hide',
      curtain: 100,
      dish: 0,
      landry: 0,
      prepareEat: 20,
      towel: 0,
      comments: null,
      created_at: '2024-1-2',
      del_flag: true,
    },
    {
      id: '3',
      person: 'taro',
      curtain: 200,
      dish: 10,
      landry: 20,
      prepareEat: 20,
      towel: 40,
      comments: 'テストコメント',
      created_at: '2024-1-2',
      del_flag: false,
    },
  ];

  return <Table data={mockData} />;
};
