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
    test('Buttonがsubmit属性、Enabledで1つレンダリングされる', () => {
      render(<Dashboard />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeEnabled();
    });
    test('対象者を未選択、開始終了をクリアし検索ボタンを押すとvalidationエラーになる', async () => {
      render(<Dashboard />);
      const validationsText = ['対象を選択', '開始日を選択', '終了日を選択'];
      const button = screen.getByRole('button');
      const user = userEvent.setup();

      const startInput = screen.getByLabelText('開始');
      const endInput = screen.getByLabelText('終了');

      await user.clear(startInput);
      await user.clear(endInput);
      await user.click(button);
      validationsText.forEach((text) => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });
  });
});
