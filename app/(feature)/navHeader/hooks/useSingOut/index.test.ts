import * as Supabase from '@/app/libs/supabase';
import { AuthError } from '@supabase/supabase-js';
import { act, renderHook } from '@testing-library/react';
import { useSignOut } from '.';

jest.mock('../../../../libs/supabase');

describe('useSignOut', () => {
  let signOutSpy: jest.SpyInstance;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('signOutが成功した場合、onErrorは呼ばれない', async () => {
    signOutSpy = jest
      .spyOn(Supabase.supabase.auth, 'signOut')
      .mockResolvedValueOnce({ error: null });

    const { result } = renderHook(() => useSignOut());

    const onError = jest.fn();

    await act(async () => {
      await result.current.signOut({ onError });
    });

    expect(signOutSpy).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  test('signOutが失敗した場合、onErrorが呼ばれる', async () => {
    const errorObj = {
      name: 'AuthError',
      message: 'Sign out failed',
    } as unknown as AuthError;

    signOutSpy = jest
      .spyOn(Supabase.supabase.auth, 'signOut')
      .mockResolvedValueOnce({ error: errorObj });

    const { result } = renderHook(() => useSignOut());
    const onError = jest.fn();

    await act(async () => {
      await result.current.signOut({ onError });
    });

    expect(signOutSpy).toHaveBeenCalled();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(errorObj);
  });
});
