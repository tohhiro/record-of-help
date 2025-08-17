import { mockThData } from '@/mocks/tableHeader';
import { render, screen } from '@testing-library/react';
import { Table, type Props } from '.';

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
    render(<Table thData={mockThData} tdData={mockTdData} />);

    expect(screen.getByText('mockPerson1')).toBeInTheDocument();
    expect(screen.getByText('mockPerson2')).toBeInTheDocument();
  });

  test('thtとtdの要素数か異なるデータを渡すと「要素の数が異なるため表示できません」が表示される', () => {
    render(<Table thData={mockThData} tdData={mockNonTdData} />);

    expect(screen.queryByText('mockPerson1')).not.toBeInTheDocument();
    expect(screen.queryByText('mockPerson2')).not.toBeInTheDocument();
    expect(screen.getByText('要素の数が異なるため表示できません')).toBeInTheDocument();
  });

  test('tdにnullが渡されると「データがありません」と表示される', () => {
    render(<Table thData={mockThData} tdData={null} />);

    expect(screen.queryByText('mockPerson1')).not.toBeInTheDocument();
    expect(screen.queryByText('mockPerson2')).not.toBeInTheDocument();
    expect(screen.getByText('データがありません')).toBeInTheDocument();
  });
});
