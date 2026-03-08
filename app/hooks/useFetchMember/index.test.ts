import { renderHook } from '@testing-library/react';
import { useFetchMember } from '.';

const mockSelect = jest.fn().mockReturnThis();
const mockEq = jest.fn();

jest.mock('@/app/libs/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: mockSelect,
    })),
  },
}));

jest.mock('swr', () => ({
  mutate: jest.fn((_key: string, promise: Promise<unknown>) => promise),
}));

const mockSuccessData = [{ admin: true }];
const mockErrorData = {
  name: 'PostgrestError',
  message: '失敗',
  details: '失敗',
  hint: '失敗',
  code: '500',
};

describe('useFetchMember', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSelect.mockReturnValue({ eq: mockEq });
  });

  test('成功時、supabaseからadminデータを取得できる', async () => {
    mockEq.mockResolvedValueOnce({ data: mockSuccessData, error: null });

    const { result } = renderHook(() => useFetchMember());
    const response = await result.current.fetchAuth({ email: 'test@test.com' });

    const { mutate } = jest.requireMock('swr');
    expect(mutate).toHaveBeenCalledWith('admin_auth_test@test.com', expect.any(Promise));

    const { supabase } = jest.requireMock('@/app/libs/supabase');
    expect(supabase.from).toHaveBeenCalledWith('members_list');
    expect(mockSelect).toHaveBeenCalledWith('admin');
    expect(mockEq).toHaveBeenCalledWith('email', 'test@test.com');
    expect(response.result).toStrictEqual({ data: mockSuccessData, error: null });
  });

  test('失敗時、supabaseからエラーレスポンスを取得できる', async () => {
    mockEq.mockResolvedValueOnce({ data: null, error: mockErrorData });

    const { result } = renderHook(() => useFetchMember());
    const response = await result.current.fetchAuth({ email: 'test@test.com' });

    expect(response.result).toStrictEqual({ data: null, error: mockErrorData });
  });

  test('supabaseが例外をスローした場合、エラーがスローされる', async () => {
    mockEq.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetchMember());

    await expect(result.current.fetchAuth({ email: 'test@test.com' })).rejects.toThrow(
      'Network error',
    );
  });
});
