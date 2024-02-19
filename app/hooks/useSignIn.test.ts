import { renderHook } from '@testing-library/react';
import { useSignIn, Props } from './useSignIn';

const mockArgs: Props = {
  email: 'test@gmail.com',
  password: 'password',
};

describe('useSignIn', () => {
  test('emailとpasswordをセットできる', async () => {
    expect.assertions(1);
    const { result } = renderHook(() => useSignIn());
    const signInSpy = jest.spyOn(result.current, 'signIn');

    result.current.signIn({ ...mockArgs });

    expect(signInSpy).toHaveBeenCalledWith({
      ...mockArgs,
    });
  });
});
