import { render } from '@testing-library/react';
import { Props, Table } from '.';

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

const mockTdData = [
  {
    person: 'mockPerson1',
    curtain: 10,
    dish: null,
    landry: null,
    prepareEat: null,
    special: null,
    comments: 'テスト1',
    created_at: '2021-10-10',
  },
  {
    person: 'mockPerson2',
    curtain: 10,
    dish: 20,
    landry: 15,
    prepareEat: 30,
    special: 40,
    comments: 'テスト2',
    created_at: '2021-10-10',
  },
];

const mockNonTdData: Props | null = [{}];

describe('Table', () => {
  test('2つのデータが表示される', () => {
    const { getByText } = render(<Table thData={mockThData} tdData={mockTdData} />);

    expect(getByText('mockPerson1')).toBeInTheDocument();
    expect(getByText('mockPerson2')).toBeInTheDocument();
  });

  test('thtとtdの要素数か異なるデータを渡すと「要素の数が異なるため表示できません」が表示される', () => {
    const { queryByText, getByText } = render(<Table thData={mockThData} tdData={mockNonTdData} />);

    expect(queryByText('mockPerson1')).not.toBeInTheDocument();
    expect(queryByText('mockPerson2')).not.toBeInTheDocument();
    expect(getByText('要素の数が異なるため表示できません')).toBeInTheDocument();
  });

  test('tdにnullが渡されると「データがありません」と表示される', () => {
    const { queryByText, getByText } = render(<Table thData={mockThData} tdData={null} />);

    expect(queryByText('mockPerson1')).not.toBeInTheDocument();
    expect(queryByText('mockPerson2')).not.toBeInTheDocument();
    expect(getByText('データがありません')).toBeInTheDocument();
  });
});
