import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavHeader } from '.';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import * as Supabase from '@/app/libs/supabase';
import { AuthError } from '@supabase/supabase-js';

jest.mock('../../libs/supabase');
jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('NavHeader', () => {
  let mockReplaceRouter: jest.SpyInstance;

  beforeEach(() => {
    mockReplaceRouter = jest.spyOn(mockRouter, 'replace');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('NavHeaderがレンダリングされる', () => {
    render(<NavHeader />);
  });

  test('Logoutをクリックするとloginページのreplaceされる', async () => {
    jest.spyOn(Supabase.supabase.auth, 'signOut').mockResolvedValueOnce({ error: null });
    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: 'Logout' });
    const user = userEvent.setup();
    await user.click(logout);

    expect(mockReplaceRouter).toHaveBeenCalledWith('/login');
  });
  // FIXME: 下記のテストが通らない
  test.skip('サインアウトが失敗する場合、Logoutをクリックしてもrouterはコールされない', async () => {
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
    const logout = screen.getByRole('link', { name: 'Logout' });
    const user = userEvent.setup();
    await user.click(logout);

    expect(mockReplaceRouter).toHaveBeenCalledWith('/login');
  });
});
