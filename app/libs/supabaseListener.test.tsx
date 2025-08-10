import { supabase } from '@/app/libs/supabase';
import SupabaseListener from '@/app/libs/supabaseListener';
import { render, waitFor } from '@testing-library/react';

const mockUpdateLoginUser = jest.fn();
const mockFetchAuth = jest.fn();
const mockRouterRefresh = jest.fn();

jest.mock('@/app/store', () => ({
  useStore: () => ({
    updateLoginUser: mockUpdateLoginUser,
  }),
}));

jest.mock('@/app/hooks', () => ({
  useFetchMember: () => ({
    fetchAuth: mockFetchAuth,
  }),
}));

jest.mock('@/app/libs/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRouterRefresh,
  }),
}));

describe('SupabaseListener', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('mount時にgetSessionとupdateLoginUserが呼ばれる', async () => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: {
        session: {
          user: { id: '123', email: 'test@example.com' },
        },
      },
    });

    mockFetchAuth.mockResolvedValue({
      result: { data: [{ admin: true }] },
    });

    render(<SupabaseListener accessToken="token123" />);

    await waitFor(() => {
      expect(supabase.auth.getSession).toHaveBeenCalled();
      expect(mockUpdateLoginUser).toHaveBeenCalledWith({
        id: '123',
        email: 'test@example.com',
        auth: true,
      });
    });
  });

  test('onAuthStateChange時にもupdateLoginUserとrefreshが呼ばれる', async () => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({ data: { session: null } });

    const mockOnAuthHandler = jest.fn();
    (supabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback: () => void) => {
      mockOnAuthHandler.mockImplementation(callback);
    });

    mockFetchAuth.mockResolvedValue({
      result: { data: [{ admin: false }] },
    });

    render(<SupabaseListener accessToken="oldToken" />);

    await waitFor(() => {
      mockOnAuthHandler(null, {
        user: { id: '456', email: 'new@example.com' },
        access_token: 'newToken',
      });
    });

    expect(mockUpdateLoginUser).toHaveBeenCalledWith({
      id: '456',
      email: 'new@example.com',
      auth: false,
    });
    expect(mockRouterRefresh).toHaveBeenCalled();
  });
});
