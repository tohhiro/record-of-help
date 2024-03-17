import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavHeader } from '.';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

jest.mock('../../libs/supabase', () => ({
  supabase: {
    auth: {
      signOut: jest.fn().mockResolvedValueOnce(() => Promise.resolve(undefined)),
    },
  },
}));

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('NavHeader', () => {
  let mockReplaceRouter: jest.SpyInstance;

  beforeEach(() => {
    mockReplaceRouter = jest.spyOn(mockRouter, 'replace');
  });

  afterEach(() => {
    mockReplaceRouter.mockRestore();
    jest.clearAllMocks();
  });

  test('NavHeaderがレンダリングされる', () => {
    render(<NavHeader />);
  });

  test('Logoutをクリックするとrouterがloginの引数とともにが呼び出される', async () => {
    render(<NavHeader />);
    const logout = screen.getByRole('link', { name: 'Logout' });
    const user = userEvent.setup();
    await user.click(logout);

    expect(mockReplaceRouter).toHaveBeenCalledWith('/login');
  });
});
