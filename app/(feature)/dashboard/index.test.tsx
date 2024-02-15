import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { default as Dashboard } from './page';
import { mockRawsData } from '../../../mocks/rawsData';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

jest.mock('../../hooks/useFetchPricesList', () => {
  const originalModule = jest.requireActual('../../hooks/useFetchRawsData');
  const pricesList = jest.requireActual('../../../mocks/rawsData');

  return {
    ...originalModule,
    success: pricesList,
    error: null,
  };
});

describe('Dashboard', () => {
  describe('検索パネル', () => {
    test('SelectBoxが1つレンダリングされる', async () => {
      render(<Dashboard />);
      const select = await screen.findAllByRole('combobox');
      expect(select).toHaveLength(1);
    });
    test('Inputがdate属性で2つレンダリングされる', () => {
      render(<Dashboard />);
      const startInput = screen.getByLabelText('開始');
      const endInput = screen.getByLabelText('終了');
      [startInput, endInput].forEach((input) => {
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'date');
      });
    });
    test('Buttonがsubmit属性で1つレンダリングされる', () => {
      render(<Dashboard />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
    });
  });
  describe('合計表示', () => {
    test('「合計：¥180」が表示される', () => {
      render(<Dashboard />);

      waitFor(() => {
        const showSumWage = screen.getByText('合計：¥180');
        expect(showSumWage).toBeInTheDocument();
      });
    });
  });
  describe('rawsData表示箇所', () => {
    test('テーブルに入ったpropsがレンダリングされる', () => {
      render(<Dashboard />);
      waitFor(() => {
        const checkboxes = screen.getAllByRole('cell');
        expect(checkboxes).toHaveLength(mockRawsData.length);
      });
    });
  });
});
