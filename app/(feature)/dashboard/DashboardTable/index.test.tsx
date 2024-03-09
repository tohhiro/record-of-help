import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardTable, TdProps } from '.';

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

const mockTdDataWithDelFlag: TdProps = [
  {
    comments: null,
    created_at: '2024-1-2',
    curtain: 100,
    del_flag: true,
    dish: 10,
    id: '1',
    landry: 20,
    person: 'eito',
    prepareEat: 20,
    special: 5,
  },
  { ...mockTdData[1] },
];

describe('DashboardTable', () => {
  test('テーブルに2つの氏名が表示され、データにない氏名は表示されない', () => {
    render(<DashboardTable th={mockThData} td={mockTdData} />);
    expect(screen.getByText('eito')).toBeInTheDocument();
    expect(screen.getByText('mei')).toBeInTheDocument();
    expect(screen.queryByText('taro')).not.toBeInTheDocument();
  });
  test('2つのデータのうち、1つにdel_flag=trueのデータが渡された場合、テーブルに1つの氏名が表示される', () => {
    render(<DashboardTable th={mockThData} td={mockTdDataWithDelFlag} />);
    expect(screen.queryByText('eito')).not.toBeInTheDocument();
    expect(screen.getByText('mei')).toBeInTheDocument();
  });
  test('tdにnullが渡されるとコンポーネントが表示されない', () => {
    const result = render(<DashboardTable th={mockThData} td={null} />);
    expect(result.container).toBeEmptyDOMElement();
  });
  test('tdに正常なデータが渡されても、thに空のオブジェクトが渡されるとコンポーネントは表示されない', () => {
    const result = render(<DashboardTable th={{}} td={mockTdData} />);
    expect(result.container).toBeEmptyDOMElement();
  });
});
