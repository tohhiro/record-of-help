import { mockRawsData } from '@/mocks/rawsData';
import { mockThData } from '@/mocks/tableHeader';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DashboardTable } from '.';
import { deleteRecord } from '@/app/(feature)/dashboard/actions';

jest.mock('@/app/(feature)/dashboard/actions', () => ({
  deleteRecord: jest.fn(),
}));

const mockedDeleteRecord = jest.mocked(deleteRecord);

const mockTdDataWithDelFlag = [
  {
    comments: null,
    created_at: '2024-1-2',
    curtain: 100,
    del_flag: true,
    dish: 10,
    id: '1',
    landry: 20,
    person: 'eito',
    prepareEat: 20,
    special: 5,
  },
  { ...mockRawsData.data[1] },
];

describe('DashboardTable', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('テーブルに3つの氏名が表示され、データにない氏名は表示されない', () => {
    render(<DashboardTable th={mockThData} td={mockRawsData.data} />);
    expect(screen.getByText('eito')).toBeInTheDocument();
    expect(screen.getByText('mei')).toBeInTheDocument();
    expect(screen.getByText('tohhiro')).toBeInTheDocument();
    expect(screen.queryByText('taro')).not.toBeInTheDocument();
  });

  test('2つのデータのうち、1つにdel_flag=trueのデータが渡された場合、テーブルに1つの氏名が表示される', () => {
    render(<DashboardTable th={mockThData} td={mockTdDataWithDelFlag} />);
    expect(screen.queryByText('eito')).not.toBeInTheDocument();
    expect(screen.getByText('mei')).toBeInTheDocument();
  });

  test('tdにnullが渡されるとコンポーネントが表示されない', () => {
    const result = render(<DashboardTable th={mockThData} td={null} />);
    expect(result.container).toBeEmptyDOMElement();
  });

  test('tdに正常なデータが渡されても、thに空のオブジェクトが渡されるとコンポーネントは表示されない', () => {
    const result = render(<DashboardTable th={{}} td={mockRawsData.data} />);
    expect(result.container).toBeEmptyDOMElement();
  });

  describe('削除ボタン', () => {
    const thWithDelete = { ...mockThData, id: '削除' };

    test('削除ボタンをクリックすると確認ダイアログが表示される', async () => {
      const user = userEvent.setup();
      const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

      render(<DashboardTable th={thWithDelete} td={mockRawsData.data} />);
      const deleteButtons = screen.getAllByRole('button', { name: '削除' });

      await user.click(deleteButtons[0]);

      expect(confirmSpy).toHaveBeenCalledWith('このレコードを削除しますか？');
    });

    test('確認ダイアログでOKを選択すると deleteRecord が該当IDで呼ばれる', async () => {
      const user = userEvent.setup();
      jest.spyOn(window, 'confirm').mockReturnValue(true);
      mockedDeleteRecord.mockResolvedValue({ status: 200 });

      render(<DashboardTable th={thWithDelete} td={mockRawsData.data} />);
      const deleteButtons = screen.getAllByRole('button', { name: '削除' });

      await act(async () => {
        await user.click(deleteButtons[0]);
      });

      expect(mockedDeleteRecord).toHaveBeenCalledTimes(1);
      expect(mockedDeleteRecord).toHaveBeenCalledWith({ id: '1' });
    });

    test('確認ダイアログでキャンセルを選択すると deleteRecord は呼ばれない', async () => {
      const user = userEvent.setup();
      jest.spyOn(window, 'confirm').mockReturnValue(false);

      render(<DashboardTable th={thWithDelete} td={mockRawsData.data} />);
      const deleteButtons = screen.getAllByRole('button', { name: '削除' });

      await user.click(deleteButtons[0]);

      expect(mockedDeleteRecord).not.toHaveBeenCalled();
    });

    test('deleteRecord が例外を投げた場合、alert でユーザーに通知される', async () => {
      const user = userEvent.setup();
      jest.spyOn(window, 'confirm').mockReturnValue(true);
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      mockedDeleteRecord.mockRejectedValue(new Error('Delete failed'));

      render(<DashboardTable th={thWithDelete} td={mockRawsData.data} />);
      const deleteButtons = screen.getAllByRole('button', { name: '削除' });

      await act(async () => {
        await user.click(deleteButtons[0]);
      });

      expect(alertSpy).toHaveBeenCalledWith(
        '削除に失敗しました: Delete failed',
      );
    });
  });
});
