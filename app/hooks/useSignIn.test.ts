import { renderHook } from '@testing-library/react';
import { useSignIn, Props } from './useSignIn';
import * as Supabase from '@/app/libs/supabase';
import { AuthTokenResponse, AuthError } from '@supabase/supabase-js';

jest.mock('../libs/supabase');

const mockArgs: Props = {
  email: 'test@gmail.com',
  password: 'password',
};

describe('useSignIn', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('emailとpasswordをセットできる', async () => {
    expect.assertions(1);
    const { result } = renderHook(() => useSignIn());
    const signInSpy = jest.spyOn(result.current, 'signIn');

    result.current.signIn({ ...mockArgs });

    expect(signInSpy).toHaveBeenCalledWith({
      ...mockArgs,
    });
  });

  test('signOut関数が成功すると、errorにはundefinedが返る', async () => {
    jest
      .spyOn(Supabase.supabase.auth, 'signInWithPassword')
      .mockResolvedValueOnce({ error: null } as unknown as AuthTokenResponse);
    const { result } = renderHook(() => useSignIn());

    await expect(result.current.signIn(mockArgs)).resolves.toStrictEqual({ error: null });
  });
  test('signOut関数失敗するとerrorが返る', async () => {
    const error = {
      error: {
        name: 'AuthError',
        message: 'Your signOut is encounter the Error.',
        status: 400,
        __isAuthError: true,
      },
    };
    jest.spyOn(Supabase.supabase.auth, 'signInWithPassword').mockRejectedValueOnce({
      ...error,
    } as unknown as AuthError);
    const { result } = renderHook(() => useSignIn());

    await expect(result.current.signIn(mockArgs)).rejects.toMatchObject({
      ...error,
    });
  });
});
