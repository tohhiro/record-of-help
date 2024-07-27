import { renderHook } from '@testing-library/react';
import { useFetchMember } from './useFetchMember';

const mockSuccessResponse = {
  result: {
    data: [{ admin: true }],
    error: null,
  },
};

const mockErrorResponse = {
  result: {
    data: null,
    error: {
      message: '失敗',
      details: '失敗',
      hint: '失敗',
      code: '500',
    },
  },
};

describe('useFetchMember', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('引数にemailを渡すことができる', async () => {
    const { result } = renderHook(() => useFetchMember());
    const fetchAuth = jest.spyOn(result.current, 'fetchAuth');
    result.current.fetchAuth({
      email: 'test@test.com',
    });
    expect(fetchAuth).toHaveBeenCalledWith({
      email: 'test@test.com',
    });
  });

  test('レスポンスが成功の場合、resultのdataにはadminがtrueで取得できる', async () => {
    const { result } = renderHook(() => useFetchMember());
    const fetchAuth = jest
      .spyOn(result.current, 'fetchAuth')
      .mockResolvedValueOnce({ ...mockSuccessResponse });

    const response = await result.current.fetchAuth({ email: 'test@test.com' });
    expect(response).toStrictEqual({
      ...mockSuccessResponse,
    });
    expect(fetchAuth).toHaveBeenCalled();
  });

  test('レスポンスが失敗の場合、resultのerrorにオブジェクトが入った状態で取得できる', async () => {
    const { result } = renderHook(() => useFetchMember());
    const fetchAuth = jest.spyOn(result.current, 'fetchAuth').mockResolvedValueOnce({
      ...mockErrorResponse,
    });

    const response = await result.current.fetchAuth({ email: 'test@test.com' });
    expect(response).toStrictEqual({
      ...mockErrorResponse,
    });
    expect(fetchAuth).toHaveBeenCalled();
  });
});
