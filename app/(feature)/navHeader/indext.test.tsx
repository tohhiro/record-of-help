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
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('NavHeaderがレンダリングされタイトルの文字列が取得できる', () => {
    const useStore = jest.spyOn(Zustand, 'useStore').mockImplementation(
      (state) =>
        state({
          loginUser: { email: '', id: '', auth: false },
          updateLoginUser: jest.fn(),
          resetLoginUser: jest.fn(),
        }) || {},
    );
    render(<NavHeader />);
    expect(screen.getByText('Record of help')).toBeInTheDocument();
    expect(useStore).toHaveBeenCalled();
  });

  test('Logoutをクリックするとloginページのreplaceされる', async () => {
    const useStore = jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));
    const signOut = jest
      .spyOn(Supabase.supabase.auth, 'signOut')
      .mockResolvedValueOnce({ error: null });

    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    const user = userEvent.setup();
    await user.click(logout);

    expect(useStore).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
  });

  test('サインアウトが失敗する場合、Logoutをクリックしてもrouterはコールされない', async () => {
    window.alert = jest.fn();
    const useStore = jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));
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
    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    const user = userEvent.setup();
    await user.click(logout);

    expect(window.alert).toHaveBeenCalledWith('ログアウトに失敗しました。');
    expect(useStore).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
  });
});
