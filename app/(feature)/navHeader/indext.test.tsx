import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavHeader } from '.';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import * as SupabaseAuth from '@/app/libs/supabaseAuth';
import { AuthError } from '@supabase/supabase-js';
import * as Zustand from '@/app/store';

jest.mock('../../libs/supabaseAuth');
jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('../../store');

const mockedLoginUser = 'test@test.com';
const data = {
  loginUser: { email: mockedLoginUser, id: 'test' },
  updateLoginUser: jest.fn(),
  resetLoginUser: jest.fn(),
};

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
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
  });

  test('Logoutをクリックするとloginページのreplaceされる', async () => {
    jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));

    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });

    const user = userEvent.setup();
    await user.click(logout);

    expect(mockReplaceRouter).toHaveBeenCalledWith('/login');
  });

  test('サインアウトが失敗する場合、Logoutをクリックしてもrouterはコールされない', async () => {
    jest.spyOn(Zustand, 'useStore').mockImplementation((state) => state(data));
    const error = {
      error: {
        status: 400,
        name: 'test',
        message: 'error',
      } as AuthError,
    };
    jest
      .spyOn(SupabaseAuth.supabaseAuth.auth, 'signOut')
      .mockImplementation(() => Promise.resolve(error));
    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: mockedLoginUser });
    const user = userEvent.setup();
    await user.click(logout);

    expect(mockReplaceRouter).not.toHaveBeenCalledWith('/login');
  });
});
