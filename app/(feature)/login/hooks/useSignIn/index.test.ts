import { renderHook } from '@testing-library/react';
import { useSignIn, Props } from '.';
import * as Supabase from '@/app/libs/supabase';
import { AuthTokenResponse, AuthError } from '@supabase/supabase-js';

jest.mock('../../../../libs/supabase');

const mockArgs: Props = {
  email: 'test@gmail.com',
  password: 'password',
};

describe('useSignIn', () => {
  let signInWithPasswordSpyOn: jest.SpyInstance;

  beforeEach(() => {
    signInWithPasswordSpyOn = jest.spyOn(Supabase.supabase.auth, 'signInWithPassword');
  });

  afterEach(() => {
    signInWithPasswordSpyOn.mockRestore();
  });

  test('emailとpasswordをセットできる', () => {
    const { result } = renderHook(() => useSignIn());
    const signInSpy = jest.spyOn(result.current, 'signIn');

    result.current.signIn({ ...mockArgs });

    expect(signInSpy).toHaveBeenCalledWith({
      ...mockArgs,
    });
    signInSpy.mockRestore();
  });

  test('signOut関数が成功すると、errorにはundefinedが返る', async () => {
    signInWithPasswordSpyOn.mockResolvedValueOnce({ error: null } as unknown as AuthTokenResponse);
    const { result } = renderHook(() => useSignIn());

    await expect(result.current.signIn(mockArgs)).resolves.toStrictEqual({ error: null });
    expect(signInWithPasswordSpyOn).toHaveBeenCalledWith(mockArgs);
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
    signInWithPasswordSpyOn.mockRejectedValueOnce({
      ...error,
    } as unknown as AuthError);
    const { result } = renderHook(() => useSignIn());

    await expect(result.current.signIn(mockArgs)).rejects.toStrictEqual({
      ...error,
    });
    expect(signInWithPasswordSpyOn).toHaveBeenCalledWith(mockArgs);
  });
});
