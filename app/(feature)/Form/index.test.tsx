import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { default as Form, Helps } from './page';
import mockRouter from 'next-router-mock';
import { mockPricesList } from '../../../mocks/pricesList';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

jest.mock('../../hooks/useFetchPricesList', () => {
  const originalModule = jest.requireActual('../../hooks/useFetchPricesList');
  const priceList = jest.requireActual('../../../mocks/pricesList');

  return {
    ...originalModule,
    success: jest.fn().mockResolvedValue(priceList as Helps[]),
    error: jest.fn().mockResolvedValueOnce(null),
  };
});

describe('Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('radio', () => {
    test('radioボタンが2つレンダリングされる', async () => {
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
        await act(() => user.click(radioButton));
        await waitFor(() => expect(radioButton).toHaveAttribute('checked', true));
      });
    });
  });
  describe('checkbox', () => {
    test('checkboxが5個レンダリングされる', async () => {
      render(<Form />);

      act(() => {
        waitFor(() => {
          const checkboxes = screen.getAllByRole('checkbox');
          expect(checkboxes).toHaveLength(mockPricesList.length);
        });
      });
    });
    test('checkboxのvalue属性が正しく設定されている', () => {
      render(<Form />);
      act(() => {
        waitFor(() => {
          const checkboxes = screen.getAllByRole('checkbox');
          checkboxes.forEach((checkbox, idx) => {
            expect(checkbox).toHaveAttribute('value', mockPricesList[idx].value);
          });
        });
      });
    });
    test('checkboxのチェックを入れると、チェックされたcheckboxの属性がcheckedになっている', async () => {
      render(<Form />);
      const user = userEvent.setup();
      act(() => {
        waitFor(() => {
          const checkboxes = screen.getAllByRole('checkbox');
          checkboxes.forEach((checkbox) => {
            user.click(checkbox);
            waitFor(() => expect(checkbox).toHaveAttribute('checked', true));
          });
        });
      });
    });
  });
  describe('textarea', () => {
    test('textareaが1つレンダーされる', () => {
      render(<Form />);
      act(() => {
        waitFor(() => {
          const textarea = screen.getAllByRole('textbox');
          expect(textarea).toHaveLength(1);
        });
      });
    });
    test('textareaに入力ができる', async () => {
      render(<Form />);
      act(() => {
        waitFor(() => {
          const textarea = screen.getByRole('textbox');
          const typeText = 'テスト';
          const user = userEvent.setup();
          user.type(textarea, typeText);
          waitFor(() => expect((textarea as HTMLTextAreaElement).value).toBe(typeText));
        });
      });
    });
  });
  describe('button', () => {
    test('buttonが1つ有効な状態でレンダーされる', () => {
      render(<Form />);
      act(() => {
        waitFor(() => {
          const button = screen.getByRole('button');
          expect(button).toBeEnabled();
        });
      });
    });
    test('buttonをそのままクリックすると「必須項目です」のバリデーションエラーが2つでる', async () => {
      render(<Form />);
      act(() => {
        waitFor(() => {
          const button = screen.getByRole('button');
          const user = userEvent.setup();
          user.click(button);
          waitFor(() => expect(screen.getAllByText('必須項目です')).toHaveLength(2));
        });
      });
    });
    test('buttonをクリックするdisabledになる', async () => {
      render(<Form />);
      mockRouter.replace('/dashboard');
      act(() => {
        waitFor(() => {
          const button = screen.getByRole('button');
          const radioButton = screen.getByRole('radio', { name: 'eito' });
          const checkbox = screen.getByRole('checkbox', { name: '皿洗い' });

          const user = userEvent.setup();
          // NOTE: バリエーションエラーにならないように、ラジオボタンとチェックボックスをクリックしておく
          user.click(radioButton);
          user.click(checkbox);
          user.click(button);

          waitFor(() => expect(button).toBeDisabled());
        });
      });
    });
  });
});
