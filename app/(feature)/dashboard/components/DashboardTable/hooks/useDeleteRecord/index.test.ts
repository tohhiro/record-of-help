import { renderHook, act } from '@testing-library/react';
import { useDeleteRecord } from '.';

const mockUpdate = jest.fn();
const mockEq = jest.fn();

jest.mock('@/app/libs/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      update: mockUpdate,
    })),
  },
}));

const mockTrigger = jest.fn();
jest.mock('swr/mutation', () => ({
  __esModule: true,
  default: jest.fn((_key: string, mutationFn: Function) => {
    mockTrigger.mockImplementation((arg: unknown) => mutationFn(_key, { arg }));
    return { trigger: mockTrigger, isMutating: false };
  }),
}));

const mockArgs = { id: '1' };

describe('useDeleteRecord', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdate.mockReturnValue({ eq: mockEq });
  });

  test('deleteRecord実行時、supabaseのraws_dataテーブルにdel_flag=trueを設定する', async () => {
    mockEq.mockResolvedValueOnce({ status: 200, statusText: 'OK' });

    const { result } = renderHook(() => useDeleteRecord());
    let response: { status: number; message: string } | undefined;

    await act(async () => {
      response = await result.current.deleteRecord({ ...mockArgs });
    });

    const useSWRMutation = jest.requireMock('swr/mutation').default;
    expect(useSWRMutation).toHaveBeenCalledWith('delete-raws-data', expect.any(Function));

    const { supabase } = jest.requireMock('@/app/libs/supabase');
    expect(supabase.from).toHaveBeenCalledWith('raws_data');
    expect(mockUpdate).toHaveBeenCalledWith({ del_flag: true });
    expect(mockEq).toHaveBeenCalledWith('id', '1');
    expect(response).toStrictEqual({ status: 200, message: 'OK' });
  });

  test('supabaseが例外をスローした場合、エラーがスローされる', async () => {
    mockEq.mockRejectedValueOnce(new Error('Delete failed'));

    const { result } = renderHook(() => useDeleteRecord());

    await act(async () => {
      await expect(result.current.deleteRecord(mockArgs)).rejects.toThrow(
        'Delete failed',
      );
    });
  });
});
