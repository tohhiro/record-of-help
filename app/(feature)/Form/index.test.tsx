import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { default as Form, helps } from './page';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Form', () => {
  describe('radio', () => {
    test('radioボタンが2つレンダリングされる', () => {
      render(<Form />);
      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons).toHaveLength(2);
    });
    test('radioボタンのvalue属性が正しく設定されている', () => {
      render(<Form />);
      const radioButtonValues = ['eito', 'mei'];
      radioButtonValues.forEach((value) => {
        const radioButton = screen.getByRole('radio', { name: value });
        expect(radioButton).toHaveAttribute('value', value);
      });
    });
    test('radioボタンのチェックを入れると、チェックされたradioボタンの属性がcheckedになっている', async () => {
      render(<Form />);
      const user = userEvent.setup();
      const radioButtonValues = ['eito', 'mei'];
      radioButtonValues.forEach(async (value) => {
        const radioButton = screen.getByRole('radio', { name: value });
        user.click(radioButton);
        await waitFor(() => expect(radioButton).toHaveAttribute('checked', true));
      });
    });
  });
  describe('checkbox', () => {
    test('checkboxが5個レンダリングされる', () => {
      render(<Form />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(helps.length);
    });
    test('checkboxのvalue属性が正しく設定されている', () => {
      render(<Form />);
      helps.forEach((help) => {
        const checkbox = screen.getByRole('checkbox', { name: help.label });
        expect(checkbox).toHaveAttribute('value', help.id);
      });
    });
    test('checkboxのチェックを入れると、チェックされたcheckboxの属性がcheckedになっている', async () => {
      render(<Form />);
      const user = userEvent.setup();
      helps.forEach(async (help) => {
        const checkbox = screen.getByRole('checkbox', { name: help.label });
        user.click(checkbox);
        await waitFor(() => expect(checkbox).toHaveAttribute('checked', true));
      });
    });
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

      const user = userEvent.setup();
      user.type(textarea, typeText);
      await waitFor(() => expect((textarea as HTMLTextAreaElement).value).toBe(typeText));
    });
  });
  describe('button', () => {
    test('buttonが1つ有効な状態でレンダーされる', () => {
      render(<Form />);
      const button = screen.getByRole('button');
      expect(button).toBeEnabled();
    });
    test('buttonをそのままクリックすると「必須項目です」のバリデーションエラーが2つでる', async () => {
      render(<Form />);
      const button = screen.getByRole('button');
      const user = userEvent.setup();
      user.click(button);
      await waitFor(() => expect(screen.getAllByText('必須項目です')).toHaveLength(2));
    });
    test('buttonをクリックするdisabledになる', async () => {
      render(<Form />);
      mockRouter.replace('/dashboard');
      const button = screen.getByRole('button');
      const radioButton = screen.getByRole('radio', { name: 'eito' });
      const checkbox = screen.getByRole('checkbox', { name: '皿洗い' });

      const user = userEvent.setup();
      // NOTE: バリエーションエラーにならないように、ラジオボタンとチェックボックスをクリックしておく
      user.click(radioButton);
      user.click(checkbox);
      user.click(button);

      await waitFor(() => expect(button).toBeDisabled());
    });
  });
});
