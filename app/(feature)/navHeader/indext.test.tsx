import * as Supabase from '@/app/libs/supabase';
import * as Zustand from '@/app/store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavHeader } from '.';

jest.mock('@/app/libs/supabase');
jest.mock('@/app/store');
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
    render(<NavHeader />);
    expect(screen.getByText('Record of help')).toBeInTheDocument();
    expect(useStore).toHaveBeenCalled();
  });

  test('ログイン名をクリックするとサインアウトとuseStoreが呼ばれる', async () => {
    useStore = jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));
    signOut = jest.spyOn(Supabase.supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });

    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    await user.click(logout);

    expect(useStore).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalled();
  });
});
