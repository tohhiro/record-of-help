import { mockRawsData } from '@/mocks/rawsData';
import { mockThData } from '@/mocks/tableHeader';
import { render, screen } from '@testing-library/react';
import { DashboardTable, type Props } from '.';

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
  { ...mockRawsData.data[1] },
];

describe('DashboardTable', () => {
  test('テーブルに2つの氏名が表示され、データにない氏名は表示されない', () => {
    render(<DashboardTable th={mockThData} td={mockRawsData.data} />);
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
    const result = render(<DashboardTable th={{}} td={mockRawsData.data} />);
    expect(result.container).toBeEmptyDOMElement();
  });
});
