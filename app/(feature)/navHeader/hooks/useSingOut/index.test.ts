import { renderHook } from '@testing-library/react';
import { useSignOut } from '.';
import * as Supabase from '@/app/libs/supabase';
import { AuthError } from '@supabase/supabase-js';

jest.mock('../../../../libs/supabase');

describe('useSignOut', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('signOut関数が成功すると、nullが返る', async () => {
    const signOut = jest
      .spyOn(Supabase.supabase.auth, 'signOut')
      .mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useSignOut());

    await expect(result.current.signOut()).resolves.toStrictEqual({ error: null });
    expect(signOut).toHaveBeenCalled();
  });

  test('SignOutがエラーの場合、errorのオブジェクトが返る', async () => {
    const error = {
      error: {
        name: 'AuthError',
        message: 'Your signOut is encounter the Error.',
        status: 400,
        __isAuthError: true,
      } as unknown as AuthError,
    };
    const signOut = jest
      .spyOn(Supabase.supabase.auth, 'signOut')
      .mockRejectedValueOnce({ ...error });
    const { result } = renderHook(() => useSignOut());

    await expect(result.current.signOut()).rejects.toStrictEqual({ ...error });
    expect(signOut).toHaveBeenCalled();
  });
});
