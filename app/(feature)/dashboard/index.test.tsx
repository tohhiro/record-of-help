import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { default as Dashboard } from './page';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Dashboard', () => {
  describe('検索パネル', () => {
    test('SelectBoxが1つレンダリングされる', () => {
      render(<Dashboard />);
      const select = screen.getAllByRole('combobox');
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
    test('Buttonがsubmit属性、disabledで1つレンダリングされる', () => {
      render(<Dashboard />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeDisabled();
    });
    test('検索項目を全て入力すると検索ボタンが有効になる', async () => {
      render(<Dashboard />);
      const select = screen.getByRole('combobox');
      const startInput = screen.getByLabelText('開始');
      const endInput = screen.getByLabelText('終了');
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      const user = userEvent.setup();

      await user.click(select);
      const option = await screen.findByText('Eito');
      await user.click(option);

      await user.type(startInput, '2022-01-01');
      await user.type(endInput, '2022-01-02');
      expect(button).toBeEnabled();
    });
  });
});
