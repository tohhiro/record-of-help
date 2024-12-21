import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { default as Dashboard } from './page';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Dashboard', () => {
  const user = userEvent.setup();

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('検索パネル', () => {
    test('SelectBoxが1つレンダリングされる', () => {
      const { getAllByRole } = render(<Dashboard />);
      const select = getAllByRole('combobox');
      expect(select).toHaveLength(1);
    });

    test('Inputがdate属性で2つレンダリングされる', () => {
      const { getByLabelText } = render(<Dashboard />);
      const startInput = getByLabelText('開始');
      const endInput = getByLabelText('終了');
      [startInput, endInput].forEach((input) => {
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'date');
      });
    });

    test('Buttonがsubmit属性、Enabledで1つレンダリングされる', () => {
      const { getByRole } = render(<Dashboard />);
      const button = getByRole('button', { name: '検索' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeEnabled();
    });

    test('対象者を未選択、開始終了をクリアし検索ボタンを押すとvalidationエラーになる', async () => {
      const { getByRole, getByLabelText, getByText } = render(<Dashboard />);
      const validationsText = ['対象を選択', '開始日を選択', '終了日を選択'];
      const button = getByRole('button', { name: '検索' });

      const startInput = getByLabelText('開始');
      const endInput = getByLabelText('終了');

      await user.clear(startInput);
      await user.clear(endInput);
      await user.click(button);
      validationsText.forEach((text) => {
        expect(getByText(text)).toBeInTheDocument();
      });
    });

    describe('非表示/表示ボタン', () => {
      test('非表示のボタンがレンダリングされる', () => {
        const { getByRole } = render(<Dashboard />);
        const button = getByRole('button', { name: '表示' });
        expect(button).toBeInTheDocument();
      });

      test('非表示のボタンをクリックすると検索パネルが表示される', async () => {
        const labelNames = ['対象者を選択', '開始', '終了', '検索', '表示'];
        const { getByRole, findByText } = render(<Dashboard />);
        const button = getByRole('button', { name: '表示' });

        await user.click(button);
        labelNames.forEach(async (text) => {
          expect(await findByText(text)).toBeInTheDocument();
        });
      });
    });
  });
});
