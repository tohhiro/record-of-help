import * as Supabase from '@/app/libs/supabase';
import { type AuthTokenResponse } from '@supabase/supabase-js';
import { act, renderHook } from '@testing-library/react';
import { useSignIn, type Props } from '.';

jest.mock('../../../../libs/supabase');

const mockArgs: Props = {
  email: 'test@example.com',
  password: 'password123',
};

describe('useSignIn', () => {
  const signInWithPasswordSpy = jest.spyOn(Supabase.supabase.auth, 'signInWithPassword');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('signIn成功時にonSuccessが呼ばれること', async () => {
    signInWithPasswordSpy.mockResolvedValueOnce({
      data: { session: {}, user: {} },
      error: null,
    } as unknown as AuthTokenResponse);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.signIn(mockArgs, { onSuccess, onError });
    });

    expect(signInWithPasswordSpy).toHaveBeenCalledWith(mockArgs);
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  test('signIn失敗時にonErrorが呼ばれ、エラーをthrowすること', async () => {
    const fakeError = { message: '認証に失敗しました', status: 400 };

    signInWithPasswordSpy.mockResolvedValueOnce({
      data: { session: null, user: null },
      error: fakeError,
    } as unknown as AuthTokenResponse);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useSignIn());

    await expect(result.current.signIn(mockArgs, { onSuccess, onError })).rejects.toThrow(
      '認証に失敗しました',
    );

    expect(signInWithPasswordSpy).toHaveBeenCalledWith(mockArgs);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(fakeError);
  });

  test('signIn失敗時にerrorがnullでもUnknown error occurredをthrowすること', async () => {
    signInWithPasswordSpy.mockResolvedValueOnce({
      data: { session: null, user: null },
      error: null,
    } as unknown as AuthTokenResponse);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    const { result } = renderHook(() => useSignIn());

    await expect(result.current.signIn(mockArgs, { onSuccess, onError })).rejects.toThrow(
      'Unknown error occurred',
    );

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(null);
  });
});
