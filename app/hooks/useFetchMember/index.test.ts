import { supabase } from '@/app/libs/supabase';
import { renderHook } from '@testing-library/react';
import useSWR from 'swr';
import { useFetchMember } from '.';

const mockSelect = jest.fn();
const mockEq = jest.fn();

jest.mock('@/app/libs/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: mockSelect,
    })),
  },
}));

jest.mock('swr');

const mockedUseSWR = jest.mocked(useSWR);

const mockSuccessData = [{ admin: true }];
const mockErrorData = {
  name: 'PostgrestError',
  message: '失敗',
  details: '失敗',
  hint: '失敗',
  code: '500',
};

describe('useFetchMember', () => {
  const commonMockData = {
    data: undefined,
    error: undefined,
    isLoading: false,
    isValidating: false,
    mutate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSelect.mockReturnValue({ eq: mockEq });
    mockedUseSWR.mockReturnValue({ ...commonMockData });
  });

  test('emailがnullの場合、SWRキーがnullになる', () => {
    const { result } = renderHook(() => useFetchMember(null));

    expect(mockedUseSWR).toHaveBeenCalledWith(null, expect.any(Function));
    expect(result.current.result).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  test('emailが指定された場合、正しいSWRキーで呼ばれadminデータを返す', () => {
    mockedUseSWR.mockReturnValue({
      ...commonMockData,
      data: { data: mockSuccessData, error: null },
    });

    const { result } = renderHook(() => useFetchMember('test@test.com'));

    expect(mockedUseSWR).toHaveBeenCalledWith('admin_auth_test@test.com', expect.any(Function));
    expect(result.current.result).toStrictEqual({ data: mockSuccessData, error: null });
  });

  test('SWRがエラーを返した場合、errorに値が入る', () => {
    const mockError = new Error('Network error');
    mockedUseSWR.mockReturnValue({
      ...commonMockData,
      error: mockError,
    });

    const { result } = renderHook(() => useFetchMember('test@test.com'));

    expect(result.current.error).toBe(mockError);
  });

  test('ローディング中はisLoadingがtrueになる', () => {
    mockedUseSWR.mockReturnValue({
      ...commonMockData,
      isLoading: true,
    });

    const { result } = renderHook(() => useFetchMember('test@test.com'));

    expect(result.current.isLoading).toBe(true);
  });

  describe('fetcherの動作テスト', () => {
    test('成功時、supabaseからadminデータを取得できる', async () => {
      renderHook(() => useFetchMember('test@test.com'));

      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      mockEq.mockResolvedValueOnce({ data: mockSuccessData, error: null });

      if (fetcherFunction) {
        const result = await fetcherFunction();
        expect(supabase.from).toHaveBeenCalledWith('members_list');
        expect(mockSelect).toHaveBeenCalledWith('admin');
        expect(mockEq).toHaveBeenCalledWith('email', 'test@test.com');
        expect(result).toStrictEqual({ data: mockSuccessData, error: null });
      }
    });

    test('失敗時、supabaseからエラーレスポンスを返す', async () => {
      renderHook(() => useFetchMember('test@test.com'));

      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      mockEq.mockResolvedValueOnce({ data: null, error: mockErrorData });

      if (fetcherFunction) {
        const result = await fetcherFunction();
        expect(result).toStrictEqual({ data: null, error: mockErrorData });
      }
    });

    test('supabaseが例外をスローした場合、エラーがスローされる', async () => {
      renderHook(() => useFetchMember('test@test.com'));

      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      mockEq.mockRejectedValueOnce(new Error('Network error'));

      if (fetcherFunction) {
        await expect(fetcherFunction()).rejects.toThrow('Network error');
      }
    });
  });
});
