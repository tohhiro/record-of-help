import { useStore } from '.';
import { renderHook, act } from '@testing-library/react';

describe('useStore', () => {
  test('loginUserのオブジェクトの初期値は、各々空文字かundefinedである', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.loginUser).toStrictEqual({
      id: '',
      email: '',
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
      id: '',
      email: '',
      auth: undefined,
    });
  });
});
