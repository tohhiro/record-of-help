import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { default as Form } from './page';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Form', () => {
  const user = userEvent.setup();
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('radio', () => {
    test('radioボタンが2つレンダリングされる', async () => {
      render(<Form />);
      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons).toHaveLength(2);
    });
    test.each`
      checkboxName | expected
      ${'eito'}    | ${'eito'}
      ${'mei'}     | ${'mei'}
    `('radioボタンのvalue属性が正しく設定されている', ({ checkboxName, expected }) => {
      render(<Form />);

      const radioButton = screen.getByRole('radio', { name: checkboxName });
      expect(radioButton).toHaveAttribute('value', expected);
    });
    test.each`
      checkboxName | expected
      ${'eito'}    | ${true}
      ${'mei'}     | ${true}
    `(
      'radioボタンのチェックを入れると、チェックされたradioボタンの属性がcheckedになっている',
      async ({ checkboxName }) => {
        render(<Form />);
        const radioButton = screen.getByRole('radio', { name: checkboxName });

        await user.click(radioButton);
        expect(radioButton).toBeChecked();
      },
    );
  });
  describe('textarea', () => {
    test('textareaが1つレンダーされる', () => {
      render(<Form />);
      const textarea = screen.getAllByRole('textbox');
      expect(textarea).toHaveLength(1);
    });
    test('textareaに入力ができる', async () => {
      render(<Form />);
      const textarea = screen.getByRole('textbox');
      const typeText = 'テスト';

      await user.type(textarea, typeText);
      expect((textarea as HTMLTextAreaElement).value).toBe(typeText);
    });
  });
  describe('button', () => {
    test('buttonが1つ有効な状態でレンダーされる', () => {
      render(<Form />);

      const button = screen.getByRole('button');
      expect(button).toBeEnabled();
    });
    test('buttonをそのままクリックすると「どちらかを選択してください」と「1つ以上選択してください」のバリデーションエラーがでる', async () => {
      render(<Form />);

      const button = screen.getByRole('button');

      await user.click(button);
      expect(screen.getAllByText('どちらかを選択してください')).toHaveLength(1);
      expect(screen.getAllByText('1つ以上選択してください')).toHaveLength(1);
    });
  });
});
