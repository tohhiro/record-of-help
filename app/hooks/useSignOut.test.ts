import { renderHook } from '@testing-library/react';
import { useSignOut } from './useSignOut';
import * as SupabaseAuth from '@/app/libs/supabaseAuth';
import { AuthError } from '@supabase/supabase-js';

jest.mock('../libs/supabaseAuth');

describe('useSignOut', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('signOut関数が成功すると、nullが返る', async () => {
    jest.spyOn(SupabaseAuth.supabaseAuth.auth, 'signOut').mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useSignOut());

    await expect(result.current.signOut()).resolves.toMatchObject({ error: null });
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
    jest.spyOn(SupabaseAuth.supabaseAuth.auth, 'signOut').mockRejectedValueOnce({ ...error });
    const { result } = renderHook(() => useSignOut());

    await expect(result.current.signOut()).rejects.toMatchObject({ ...error });
  });
});
