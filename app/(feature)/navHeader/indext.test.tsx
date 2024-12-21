import * as Supabase from '@/app/libs/supabase';
import * as Zustand from '@/app/store';
import { AuthError } from '@supabase/supabase-js';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavHeader } from '.';

jest.mock('../../libs/supabase');
jest.mock('../../store');
jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

const mockedLoginUser = 'test@test.com';
const data = {
  loginUser: { email: mockedLoginUser, id: 'test', auth: true },
  updateLoginUser: jest.fn(),
  resetLoginUser: jest.fn(),
};

describe('NavHeader', () => {
  const user = userEvent.setup();

  let useStore: jest.SpyInstance;
  let signOut: jest.SpyInstance;
  let alert: jest.SpyInstance;

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('NavHeaderがレンダリングされタイトルの文字列が取得できる', () => {
    useStore = jest.spyOn(Zustand, 'useStore').mockImplementation(
      (state) =>
        state({
          loginUser: { email: '', id: '', auth: false },
          updateLoginUser: jest.fn(),
          resetLoginUser: jest.fn(),
        }) || {},
    );
    signOut = jest.spyOn(Supabase.supabase.auth, 'signOut');
    const { getByText } = render(<NavHeader />);
    expect(getByText('Record of help')).toBeInTheDocument();
    expect(useStore).toHaveBeenCalled();
  });

  test('Logoutをクリックするとloginページのreplaceされる', async () => {
    useStore = jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));
    signOut = jest.spyOn(Supabase.supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });

    const { getByRole } = render(<NavHeader />);
    const logout = getByRole('link', { name: mockedLoginUser });
    await user.click(logout);

    expect(useStore).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
  });

  test('サインアウトが失敗する場合、Logoutをクリックしてもrouterはコールされない', async () => {
    alert = jest.spyOn(window, 'alert');
    useStore = jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));

    const error = {
      error: {
        name: 'AuthError',
        message: 'Your signOut is encounter the Error.',
        status: 400,
        __isAuthError: true,
      } as unknown as AuthError,
    };
    signOut = jest.spyOn(Supabase.supabase.auth, 'signOut').mockRejectedValueOnce({ ...error });
    const { getByRole } = render(<NavHeader />);
    const logout = getByRole('link', { name: mockedLoginUser });
    await user.click(logout);

    expect(useStore).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith('ログアウトに失敗しました。');
  });
});
