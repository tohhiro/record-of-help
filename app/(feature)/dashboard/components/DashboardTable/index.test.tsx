import { render } from '@testing-library/react';
import { DashboardTable, Props } from '.';

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

const mockTdDataWithDelFlag: Props = [
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
    const { getByText, queryByText } = render(<DashboardTable th={mockThData} td={mockTdData} />);
    expect(getByText('eito')).toBeInTheDocument();
    expect(getByText('mei')).toBeInTheDocument();
    expect(queryByText('taro')).not.toBeInTheDocument();
  });

  test('2つのデータのうち、1つにdel_flag=trueのデータが渡された場合、テーブルに1つの氏名が表示される', () => {
    const { getByText, queryByText } = render(
      <DashboardTable th={mockThData} td={mockTdDataWithDelFlag} />,
    );
    expect(queryByText('eito')).not.toBeInTheDocument();
    expect(getByText('mei')).toBeInTheDocument();
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
