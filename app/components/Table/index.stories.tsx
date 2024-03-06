import React from 'react';
import { Table, PropsTableTd } from '.';

export default {
  title: 'app/components/Table',
  component: Table,
};

export const Default: React.FC = (): JSX.Element => {
  const mockThData = {
    person: '名前',
    dish: '皿洗い',
    curtain: 'カーテン開閉',
    prepareEat: '食事準備',
    landry: '洗濯物片付け',
    special: 'スペシャル',
    comments: 'コメント',
    created_at: '日付',
  };
  const mockTdData: PropsTableTd = [
    {
      id: '1',
      person: 'taro',
      curtain: 100,
      dish: 0,
      landry: 0,
      prepareEat: 20,
      special: 0,
      comments: null,
      created_at: '2024-1-2',
    },
    {
      id: '2',
      person: 'hide',
      curtain: 100,
      dish: 0,
      landry: 0,
      prepareEat: 20,
      special: 0,
      comments: null,
      created_at: '2024-1-2',
    },
    {
      id: '3',
      person: 'taro',
      curtain: 200,
      dish: 10,
      landry: 20,
      prepareEat: 20,
      special: 40,
      comments: 'テストコメント',
      created_at: '2024-1-2',
    },
  ];

  return <Table thData={mockThData} tdData={mockTdData} />;
};
