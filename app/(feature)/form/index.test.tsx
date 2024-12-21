import { mockPricesListRaw } from '@/mocks/pricesList';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFetchPricesList } from './hooks/useFetchPricesList';
import { default as Form } from './page';

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
      const { getAllByRole } = render(<Form />);

      const radioButtons = getAllByRole('radio');
      expect(radioButtons).toHaveLength(2);
    });

    test.each`
      checkboxName | expected
      ${'eito'}    | ${'eito'}
      ${'mei'}     | ${'mei'}
    `('radioボタンのvalue属性が正しく設定されている', ({ checkboxName, expected }) => {
      const { getByRole } = render(<Form />);

      const radioButton = getByRole('radio', { name: checkboxName });
      expect(radioButton).toHaveAttribute('value', expected);
    });

    test.each`
      checkboxName | expected
      ${'eito'}    | ${true}
      ${'mei'}     | ${true}
    `(
      'radioボタンのチェックを入れると、チェックされたradioボタンの属性がcheckedになっている',
      async ({ checkboxName }) => {
        const { getByRole } = render(<Form />);
        const radioButton = getByRole('radio', { name: checkboxName });

        await user.click(radioButton);
        expect(radioButton).toBeChecked();
      },
    );
  });

  describe('checkbox', () => {
    test('checkboxが5つレンダリングされる', () => {
      const { getAllByRole } = render(<Form />);
      const checkboxes = getAllByRole('checkbox');
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
      const { getByRole } = render(<Form />);
      const checkbox = getByRole('checkbox', { name: checkboxName });
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
      const { getByRole } = render(<Form />);
      const checkbox = getByRole('checkbox', { name: checkboxName });
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  describe('textarea', () => {
    test('textareaが1つレンダーされる', () => {
      const { getAllByRole } = render(<Form />);
      const textarea = getAllByRole('textbox');
      expect(textarea).toHaveLength(1);
    });

    test('textareaに入力ができる', async () => {
      const { getByRole } = render(<Form />);
      const textarea = getByRole('textbox');
      const typeText = 'テスト';

      await user.type(textarea, typeText);
      expect(textarea).toHaveDisplayValue(typeText);
    });
  });

  describe('button', () => {
    test('buttonが1つ有効な状態でレンダーされる', () => {
      const { getByRole } = render(<Form />);

      const button = getByRole('button');
      expect(button).toBeEnabled();
    });

    test('buttonをそのままクリックすると「どちらかを選択してください」と「1つ以上選択してください」のバリデーションエラーがでる', async () => {
      const { getByRole, getAllByText } = render(<Form />);

      const button = getByRole('button');

      await user.click(button);
      expect(getAllByText('どちらかを選択してください')).toHaveLength(1);
      expect(getAllByText('1つ以上選択してください')).toHaveLength(1);
    });
  });
});
