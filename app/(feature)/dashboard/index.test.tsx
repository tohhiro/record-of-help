import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardClient } from './DashboardClient';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Dashboard', () => {
  const user = userEvent.setup();
  const mockMemberOptions = [
    { value: 'all', label: 'All' },
    { value: 'eito', label: 'eito' },
    { value: 'mei', label: 'mei' },
    { value: 'tohhiro', label: 'tohhiro' },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('検索パネル', () => {
    test('SelectBoxが1つレンダリングされる', () => {
      render(<DashboardClient memberOptions={mockMemberOptions} />);
      const select = screen.getAllByRole('combobox');
      expect(select).toHaveLength(1);
    });

    test('Inputがdate属性で2つレンダリングされる', () => {
      render(<DashboardClient memberOptions={mockMemberOptions} />);
      const startInput = screen.getByLabelText('開始');
      const endInput = screen.getByLabelText('終了');
      [startInput, endInput].forEach((input) => {
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'date');
      });
    });

    test('Buttonがsubmit属性、Enabledで1つレンダリングされる', () => {
      render(<DashboardClient memberOptions={mockMemberOptions} />);
      const button = screen.getByRole('button', { name: '検索' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toBeEnabled();
    });

    test('対象者を未選択、開始終了をクリアし検索ボタンを押すとvalidationエラーになる', async () => {
      render(<DashboardClient memberOptions={mockMemberOptions} />);
      const validationsText = ['対象を選択', '開始日を選択', '終了日を選択'];
      const button = screen.getByRole('button', { name: '検索' });

      const startInput = screen.getByLabelText('開始');
      const endInput = screen.getByLabelText('終了');

      await user.clear(startInput);
      await user.clear(endInput);
      await user.click(button);
      validationsText.forEach((text) => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    describe('非表示/表示ボタン', () => {
      test('非表示のボタンがレンダリングされる', () => {
        render(<DashboardClient memberOptions={mockMemberOptions} />);
        const button = screen.getByRole('button', { name: '表示' });
        expect(button).toBeInTheDocument();
      });

      test('表示ボタンをクリックすると検索パネルが表示される', async () => {
        const labelNames = ['対象者を選択', '開始', '終了', '検索', '非表示'];
        render(<DashboardClient memberOptions={mockMemberOptions} />);
        const button = screen.getByRole('button', { name: '表示' });

        await user.click(button);
        for (const text of labelNames) {
          expect(await screen.findByText(text)).toBeInTheDocument();
        }
      });
    });
  });
});
