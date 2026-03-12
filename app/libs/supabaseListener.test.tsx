import { useFetchMember } from '@/app/hooks';
import { supabase } from '@/app/libs/supabase';
import SupabaseListener from '@/app/libs/supabaseListener';
import { useStore } from '@/app/store';
import { render, waitFor } from '@testing-library/react';
import { type Session, type Subscription } from '@supabase/auth-js';
import mockRouter from 'next-router-mock';

jest.mock('@/app/store');
jest.mock('@/app/hooks');

const mockUseStore = jest.mocked(useStore);
const mockUseFetchMember = jest.mocked(useFetchMember);

const mockRouterRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    ...mockRouter,
    refresh: mockRouterRefresh,
  }),
}));

/** テスト用の最小限Session */
const createMockSession = (overrides: { id: string; email: string }): Session => ({
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: {
    id: overrides.id,
    email: overrides.email,
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: '',
  },
});

/** テスト用の最小限Subscription */
const createMockSubscription = (unsubscribe: jest.Mock): Subscription => ({
  id: 'mock-subscription-id',
  callback: jest.fn(),
  unsubscribe,
});

describe('SupabaseListener', () => {
  const mockUpdateLoginUser = jest.fn();
  const mockFetchAuth = jest.fn();

  beforeEach(() => {
    mockUseStore.mockReturnValue({
      updateLoginUser: mockUpdateLoginUser,
    });

    mockUseFetchMember.mockReturnValue({
      fetchAuth: mockFetchAuth,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('mount時にgetSessionとupdateLoginUserが呼ばれる', async () => {
    const getSessionSpy = jest.spyOn(supabase.auth, 'getSession').mockResolvedValue({
      data: {
        session: createMockSession({ id: '123', email: 'test@example.com' }),
      },
      error: null,
    });

    const mockUnsubscribe = jest.fn();
    jest.spyOn(supabase.auth, 'onAuthStateChange').mockReturnValue({
      data: { subscription: createMockSubscription(mockUnsubscribe) },
    });

    mockFetchAuth.mockResolvedValue({
      result: { data: [{ admin: true }] },
    });

    render(<SupabaseListener accessToken="token123" />);

    await waitFor(() => {
      expect(getSessionSpy).toHaveBeenCalled();
      expect(mockUpdateLoginUser).toHaveBeenCalledWith({
        id: '123',
        email: 'test@example.com',
        auth: true,
      });
    });
  });

  test('onAuthStateChange時にもupdateLoginUserとrefreshが呼ばれる', async () => {
    jest
      .spyOn(supabase.auth, 'getSession')
      .mockResolvedValue({ data: { session: null }, error: null });

    const mockOnAuthHandler = jest.fn();
    const mockUnsubscribe = jest.fn();
    jest
      .spyOn(supabase.auth, 'onAuthStateChange')
      .mockImplementation(((callback: (..._args: unknown[]) => void) => {
        mockOnAuthHandler.mockImplementation(callback);
        return { data: { subscription: createMockSubscription(mockUnsubscribe) } };
      }) as typeof supabase.auth.onAuthStateChange);

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

  test('onAuthStateChange時にsessionがnullの場合はloginUserをリセットする', async () => {
    jest
      .spyOn(supabase.auth, 'getSession')
      .mockResolvedValue({ data: { session: null }, error: null });

    const mockOnAuthHandler = jest.fn();
    const mockUnsubscribe = jest.fn();
    jest
      .spyOn(supabase.auth, 'onAuthStateChange')
      .mockImplementation(((callback: (..._args: unknown[]) => void) => {
        mockOnAuthHandler.mockImplementation(callback);
        return { data: { subscription: createMockSubscription(mockUnsubscribe) } };
      }) as typeof supabase.auth.onAuthStateChange);

    render(<SupabaseListener accessToken="oldToken" />);

    await waitFor(() => {
      mockOnAuthHandler(null, null);
    });

    expect(mockUpdateLoginUser).toHaveBeenCalledWith({
      id: null,
      email: null,
      auth: undefined,
    });
    expect(mockFetchAuth).not.toHaveBeenCalledWith({ email: expect.any(String) });
  });
});
