import { renderHook } from '@testing-library/react';
import { useSignOut } from './useSignOut';

describe('useSignOut', () => {
  test('signOut関数を呼び出しコールできる', async () => {
    expect.assertions(1);
    const { result } = renderHook(() => useSignOut());
    const signOutSpy = jest.spyOn(result.current, 'signOut');

    result.current.signOut();

    expect(signOutSpy).toHaveBeenCalledTimes(1);
  });
});
