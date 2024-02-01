import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table, Props } from '.';

const mockThData = {
  person: '名前',
  dish: '皿洗い',
  curtain: 'カーテン開閉',
  prepareEat: '食事準備',
  landry: '洗濯物片付け',
  special: 'スペシャル',
  comments: 'コメント',
  created_at: '日付',
} as const;

const mockTdData = (mock1DelFlag?: boolean, mock2DelFlag?: boolean) => {
  const tdData = [
    {
      id: 'mockId1',
      person: 'mockPerson1',
      curtain: 10,
      dish: null,
      landry: null,
      prepareEat: null,
      special: null,
      comments: 'テスト1',
      created_at: '2021-10-10',
      del_flag: mock1DelFlag || false,
    },
    {
      id: 'mockId2',
      person: 'mockPerson2',
      curtain: 10,
      dish: 20,
      landry: 15,
      prepareEat: 30,
      special: 40,
      comments: 'テスト2',
      created_at: '2021-10-10',
      del_flag: mock2DelFlag || false,
    },
  ] as Props;

  return tdData;
};

describe('Table', () => {
  test('2つのデータが表示される', () => {
    render(<Table thData={mockThData} tdData={mockTdData()} />);
    expect(screen.getByText('mockPerson1')).toBeInTheDocument();
    expect(screen.getByText('mockPerson2')).toBeInTheDocument();
  });
  test('1つのデータが表示される', () => {
    render(<Table thData={mockThData} tdData={mockTdData(false, true)} />);
    expect(screen.getByText('mockPerson1')).toBeInTheDocument();
    expect(screen.queryByText('mockPerson2')).not.toBeInTheDocument();
  });
  test('データが表示されない', () => {
    render(<Table thData={mockThData} tdData={mockTdData(true, true)} />);
    expect(screen.queryByText('mockPerson1')).not.toBeInTheDocument();
    expect(screen.queryByText('mockPerson2')).not.toBeInTheDocument();
  });
});
