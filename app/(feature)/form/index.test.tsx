import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { default as Form } from './page';
import { useFetchPricesList } from './hooks/useFetchPricesList';
import { mockPricesListRaw } from '@/mocks/pricesList';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('./hooks/useFetchPricesList');

const mockUseFetchPricesList = jest.mocked(useFetchPricesList);

describe('Form', () => {
  const user = userEvent.setup();

  beforeAll(() => {
    mockUseFetchPricesList.mockReturnValue(mockPricesListRaw);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('radio', () => {
    test('radioボタンが2つレンダリングされる', () => {
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

  describe('checkbox', () => {
    test('checkboxが5つレンダリングされる', () => {
      render(<Form />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(mockPricesListRaw.data.length);
    });

    test.each`
      checkboxName      | expected
      ${'皿洗い'}       | ${'dish,30'}
      ${'カーテン開閉'} | ${'curtain,10'}
      ${'食事準備'}     | ${'prepareEat,20'}
      ${'洗濯物片付け'} | ${'landry,20'}
      ${'スペシャル'}   | ${'special,50'}
    `('checkboxのvalue属性が正しく設定されている', ({ checkboxName, expected }) => {
      render(<Form />);
      const checkbox = screen.getByRole('checkbox', { name: checkboxName });
      expect(checkbox).toHaveAttribute('value', expected);
    });

    test.each`
      checkboxName
      ${'皿洗い'}
      ${'カーテン開閉'}
      ${'食事準備'}
      ${'洗濯物片付け'}
      ${'スペシャル'}
    `('checkboxのvalue属性が正しく設定されている', async ({ checkboxName }) => {
      render(<Form />);
      const checkbox = screen.getByRole('checkbox', { name: checkboxName });
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
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
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const typeText = 'テスト';

      await user.type(textarea, typeText);
      expect(textarea.value).toBe(typeText);
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
