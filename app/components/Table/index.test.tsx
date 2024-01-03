import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table, Props } from '.';

const mockTableData = (mock1DelFlag?: boolean, mock2DelFlag?: boolean) => {
  const data = [
    {
      id: 'mockId1',
      person: 'mockPerson1',
      curtain: 10,
      dish: null,
      landry: null,
      prepareEat: null,
      towel: null,
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
      towel: 40,
      comments: 'テスト2',
      created_at: '2021-10-10',
      del_flag: mock2DelFlag || false,
    },
  ] as Props[];

  return data;
};

describe('Table', () => {
  test('2つのデータが表示される', () => {
    render(<Table data={mockTableData()} />);
    expect(screen.getByText('mockPerson1')).toBeInTheDocument();
    expect(screen.getByText('mockPerson2')).toBeInTheDocument();
  });
  test('1つのデータが表示される', () => {
    render(<Table data={mockTableData(false, true)} />);
    expect(screen.getByText('mockPerson1')).toBeInTheDocument();
    expect(screen.queryByText('mockPerson2')).not.toBeInTheDocument();
  });
  test('データが表示されない', () => {
    render(<Table data={mockTableData(true, true)} />);
    expect(screen.queryByText('mockPerson1')).not.toBeInTheDocument();
    expect(screen.queryByText('mockPerson2')).not.toBeInTheDocument();
  });
});
