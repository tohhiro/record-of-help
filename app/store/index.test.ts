import { act, renderHook } from '@testing-library/react';
import { useStore } from '.';

describe('useStore', () => {
  test('loginUserのオブジェクトの初期値は、各々nullかundefinedである', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.loginUser).toStrictEqual({
      id: null,
      email: null,
      auth: undefined,
    });
  });

  test('updateLoginUserを使ってログインユーザーをアップデートすると、loginUserも同じ内容に更新される', () => {
    const { result } = renderHook(() => useStore());
    const updateLoginUser = { id: '123', email: 'user@example.com', auth: true };

    act(() => {
      result.current.updateLoginUser(updateLoginUser);
    });

    expect(result.current.loginUser).toEqual(updateLoginUser);
  });

  test('ログインユーザーをアップデートしたあと、リセットするとloginUserは初期状態になる', () => {
    const { result } = renderHook(() => useStore());
    const updateLoginUser = { id: '123', email: 'user@example.com', auth: true };

    act(() => {
      result.current.updateLoginUser(updateLoginUser);
    });

    act(() => {
      result.current.resetLoginUser();
    });

    expect(result.current.loginUser).toEqual({
      id: null,
      email: null,
      auth: undefined,
    });
  });
});
