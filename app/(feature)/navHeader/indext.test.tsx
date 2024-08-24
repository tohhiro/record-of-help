import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavHeader } from '.';
import userEvent from '@testing-library/user-event';
import * as Supabase from '@/app/libs/supabase';
import { AuthError } from '@supabase/supabase-js';
import * as Zustand from '@/app/store';

jest.mock('../../libs/supabase');
jest.mock('next/navigation');
jest.mock('../../store');

const mockedLoginUser = 'test@test.com';
const data = {
  loginUser: { email: mockedLoginUser, id: 'test', auth: true },
  updateLoginUser: jest.fn(),
  resetLoginUser: jest.fn(),
};

describe('NavHeader', () => {
  let useStore: jest.SpyInstance;
  let signOut: jest.SpyInstance;
  let alert: jest.SpyInstance;

  afterEach(() => {
    jest.clearAllMocks();
    useStore.mockRestore();
    signOut.mockRestore();
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
    render(<NavHeader />);
    expect(screen.getByText('Record of help')).toBeInTheDocument();
    expect(useStore).toHaveBeenCalled();
  });

  test('Logoutをクリックするとloginページのreplaceされる', async () => {
    useStore = jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));
    signOut = jest.spyOn(Supabase.supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });

    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    const user = userEvent.setup();
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
    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    const user = userEvent.setup();
    await user.click(logout);

    expect(useStore).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith('ログアウトに失敗しました。');

    alert.mockRestore();
  });
});
