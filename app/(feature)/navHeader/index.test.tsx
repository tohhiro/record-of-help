import * as Supabase from '@/app/libs/supabase';
import { useStore } from '@/app/store';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthApiError } from '@supabase/auth-js';
import { NavHeader } from '.';

jest.mock('@/app/store');
jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

const mockedUseStore = jest.mocked(useStore);

const originalLocation = window.location;
beforeEach(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    writable: true,
    value: { ...originalLocation, href: originalLocation.href },
  });
});
afterEach(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    writable: true,
    value: originalLocation,
  });
});

const mockedLoginUser = 'test@test.com';
const data = {
  loginUser: { email: mockedLoginUser, id: 'test', auth: true },
  updateLoginUser: jest.fn(),
  resetLoginUser: jest.fn(),
};

describe('NavHeader', () => {
  const user = userEvent.setup();

  let signOut: jest.SpyInstance;

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('NavHeaderがレンダリングされタイトルの文字列が取得できる', () => {
    mockedUseStore.mockImplementation(
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
    expect(mockedUseStore).toHaveBeenCalled();
  });

  test('ログイン名をクリックするとサインアウトとuseStoreが呼ばれる', async () => {
    mockedUseStore.mockImplementation((state) => state(data));
    signOut = jest.spyOn(Supabase.supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });

    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    await user.click(logout);

    expect(mockedUseStore).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
    expect(window.location.href).toBe('/login');
  });

  test('サインアウトに失敗した場合、alertが表示される', async () => {
    const errorMessage = 'Sign out failed';
    mockedUseStore.mockImplementation((state) => state(data));
    signOut = jest.spyOn(Supabase.supabase.auth, 'signOut').mockResolvedValueOnce({
      error: new AuthApiError(errorMessage, 500, 'unexpected'),
    });
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    await user.click(logout);

    expect(signOut).toHaveBeenCalled();
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        `ログアウトに失敗しました。\n ${errorMessage}`,
      );
    });
  });
});
