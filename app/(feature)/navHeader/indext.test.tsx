import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavHeader } from '.';
import userEvent from '@testing-library/user-event';
import * as Supabase from '@/app/libs/supabase';
import { AuthError } from '@supabase/supabase-js';
import * as Zustand from '@/app/store';
import * as nextNavigation from 'next/navigation';

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
  let mockReplaceRouter: jest.SpyInstance;

  beforeEach(() => {
    mockReplaceRouter = jest.spyOn(nextNavigation, 'useRouter').mockImplementation(() => {
      return {
        refresh: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('NavHeaderがレンダリングされタイトルの文字列が取得できる', () => {
    jest.spyOn(Zustand, 'useStore').mockImplementation(
      (state) =>
        state({
          loginUser: { email: '', id: '', auth: false },
          updateLoginUser: jest.fn(),
          resetLoginUser: jest.fn(),
        }) || {},
    );
    render(<NavHeader />);
    expect(screen.getByText('Record of help')).toBeInTheDocument();
  });

  test('Logoutをクリックするとloginページのreplaceされる', async () => {
    jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));
    jest.spyOn(Supabase.supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });

    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    const user = userEvent.setup();
    await user.click(logout);

    expect(mockReplaceRouter).toHaveBeenCalled();
  });

  test('サインアウトが失敗する場合、Logoutをクリックしてもrouterはコールされない', async () => {
    window.alert = jest.fn();
    jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));
    const error = {
      error: {
        name: 'AuthError',
        message: 'Your signOut is encounter the Error.',
        status: 400,
        __isAuthError: true,
      } as unknown as AuthError,
    };
    jest.spyOn(Supabase.supabase.auth, 'signOut').mockRejectedValueOnce({ ...error });
    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    const user = userEvent.setup();
    await user.click(logout);

    expect(window.alert).toHaveBeenCalledWith('ログアウトに失敗しました。');
  });
});
