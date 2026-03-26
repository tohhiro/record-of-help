import { mockPricesListRaw } from '@/mocks/pricesList';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFetchPricesList } from './hooks/useFetchPricesList';
import { usePostHelp } from './hooks/usePostHelp';
import { default as Form } from './page';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('./hooks/useFetchPricesList');
jest.mock('./hooks/usePostHelp');

const mockUseFetchPricesList = jest.mocked(useFetchPricesList);
const mockUsePostHelp = jest.mocked(usePostHelp);

describe('Form', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockUseFetchPricesList.mockReturnValue(mockPricesListRaw);
    mockUsePostHelp.mockReturnValue({
      postHelp: jest.fn().mockResolvedValue(undefined),
      isMutating: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('radio', () => {
    test('radioボタンが3つレンダリングされる', () => {
      render(<Form />);

      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons).toHaveLength(3);
    });

    test.each`
      radioName    | expected
      ${'eito'}    | ${'eito'}
      ${'mei'}     | ${'mei'}
      ${'tohhiro'} | ${'tohhiro'}
    `('radioボタンのvalue属性が正しく設定されている', ({ radioName, expected }) => {
      render(<Form />);

      const radioButton = screen.getByRole('radio', { name: radioName });
      expect(radioButton).toHaveAttribute('value', expected);
    });

    test.each`
      radioName    | expected
      ${'eito'}    | ${true}
      ${'mei'}     | ${true}
      ${'tohhiro'} | ${true}
    `(
      'radioボタンのチェックを入れると、チェックされたradioボタンの属性がcheckedになっている',
      async ({ radioName }) => {
        render(<Form />);
        const radioButton = screen.getByRole('radio', { name: radioName });

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
      const textarea = screen.getByRole('textbox');
      const typeText = 'テスト';

      await user.type(textarea, typeText);
      expect(textarea).toHaveDisplayValue(typeText);
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

  describe('submit error', () => {
    test('送信に失敗した場合、alertが表示される', async () => {
      const errorMessage = 'Server error';
      const mockPostHelp = jest.fn().mockImplementation((_data, cb) => {
        cb.onError(new Error(errorMessage));
        return Promise.resolve();
      });

      mockUsePostHelp.mockReturnValue({
        postHelp: mockPostHelp,
        isMutating: false,
      });

      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(<Form />);

      const radioButton = screen.getByRole('radio', { name: 'eito' });
      await user.click(radioButton);

      const checkbox = screen.getByRole('checkbox', { name: '皿洗い' });
      await user.click(checkbox);

      const button = screen.getByRole('button');
      await user.click(button);

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          `エラーが発生しました: ${errorMessage}`,
        );
      });
    });
  });
});
