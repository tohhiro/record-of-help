import { renderHook, act } from '@testing-library/react';
import { useSignIn } from './useSignIn';

describe('useSignIn', () => {
  test('emailとpasswordをセットできる', async () => {
    const { result } = renderHook(() => useSignIn());
    const signInSpy = jest.spyOn(result.current, 'signIn');

    signInSpy.mockImplementation(async (_args: { email: string; password: string }) => {
      return Promise.resolve({
        data: { user: null, session: null },
        error: null,
      });
    });

    await act(async () => {
      const signInPromise = result.current.signIn({
        email: 'test@gmail.com',
        password: 'password',
      });
      await signInPromise;
    });

    expect(signInSpy).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'password',
    });
  });
});
