import { useFetchMember } from '@/app/hooks';
import { supabase } from '@/app/libs/supabase';
import SupabaseListener from '@/app/libs/supabaseListener';
import { useStore } from '@/app/store';
import { render, waitFor, act } from '@testing-library/react';
import { AuthError, type Subscription, type User } from '@supabase/auth-js';
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

/** テスト用の最小限User */
const createMockUser = (overrides: { id: string; email?: string }): User => ({
  id: overrides.id,
  email: overrides.email,
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: '',
});

/** テスト用の最小限Subscription */
const createMockSubscription = (unsubscribe: Subscription['unsubscribe']): Subscription => ({
  id: 'mock-subscription-id',
  callback: jest.fn(),
  unsubscribe,
});

/** onAuthStateChange のコールバック型 */
type AuthStateChangeCallback = Parameters<typeof supabase.auth.onAuthStateChange>[0];

describe('SupabaseListener', () => {
  const mockUpdateLoginUser = jest.fn();

  beforeEach(() => {
    mockUseStore.mockReturnValue({
      updateLoginUser: mockUpdateLoginUser,
    });

    mockUseFetchMember.mockReturnValue({
      memberData: null,
      postgrestError: null,
      swrError: undefined,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('mount時にgetUserとupdateLoginUserが呼ばれる', async () => {
    const getUserSpy = jest.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: {
        user: createMockUser({ id: '123', email: 'test@example.com' }),
      },
      error: null,
    });

    const mockUnsubscribe = jest.fn();
    jest.spyOn(supabase.auth, 'onAuthStateChange').mockReturnValue({
      data: { subscription: createMockSubscription(mockUnsubscribe) },
    });

    mockUseFetchMember.mockReturnValue({
      memberData: [{ admin: true }],
      postgrestError: null,
      swrError: undefined,
      isLoading: false,
    });

    render(<SupabaseListener serverUserId="123" />);

    await waitFor(() => {
      expect(getUserSpy).toHaveBeenCalled();
      expect(mockUpdateLoginUser).toHaveBeenCalledWith({
        id: '123',
        email: 'test@example.com',
        auth: true,
      });
    });
  });

  test('onAuthStateChange時にもupdateLoginUserとrefreshが呼ばれる', async () => {
    jest
      .spyOn(supabase.auth, 'getUser')
      .mockResolvedValue({ data: { user: null }, error: new AuthError('Not authenticated') });

    const mockOnAuthHandler = jest.fn();
    const mockUnsubscribe = jest.fn();
    jest
      .spyOn(supabase.auth, 'onAuthStateChange')
      .mockImplementation((callback: AuthStateChangeCallback) => {
        mockOnAuthHandler.mockImplementation(callback);
        return { data: { subscription: createMockSubscription(mockUnsubscribe) } };
      });

    mockUseFetchMember.mockReturnValue({
      memberData: [{ admin: false }],
      postgrestError: null,
      swrError: undefined,
      isLoading: false,
    });

    render(<SupabaseListener serverUserId="oldUserId" />);

    await act(async () => {
      await mockOnAuthHandler(null, {
        user: { id: '456', email: 'new@example.com' },
        access_token: 'newToken',
      });
    });

    await waitFor(() => {
      expect(mockUpdateLoginUser).toHaveBeenCalledWith({
        id: '456',
        email: 'new@example.com',
        auth: false,
      });
    });
    expect(mockRouterRefresh).toHaveBeenCalled();
  });

  test('onAuthStateChange時にsessionがnullの場合はloginUserをリセットする', async () => {
    jest
      .spyOn(supabase.auth, 'getUser')
      .mockResolvedValue({ data: { user: null }, error: new AuthError('Not authenticated') });

    const mockOnAuthHandler = jest.fn();
    const mockUnsubscribe = jest.fn();
    jest
      .spyOn(supabase.auth, 'onAuthStateChange')
      .mockImplementation((callback: AuthStateChangeCallback) => {
        mockOnAuthHandler.mockImplementation(callback);
        return { data: { subscription: createMockSubscription(mockUnsubscribe) } };
      });

    render(<SupabaseListener serverUserId="existingUserId" />);

    await act(async () => {
      await mockOnAuthHandler(null, null);
    });

    await waitFor(() => {
      expect(mockUpdateLoginUser).toHaveBeenCalledWith({
        id: null,
        email: null,
        auth: undefined,
      });
    });
    // sessionがnullの場合、useFetchMemberにemail（文字列）は渡されない
    expect(mockUseFetchMember).not.toHaveBeenCalledWith(expect.any(String));
    // serverUserId が存在するのに session が null → ユーザーがログアウトしたため refresh
    expect(mockRouterRefresh).toHaveBeenCalled();
  });

  test('onAuthStateChange時にsessionがnullかつserverUserIdが未設定の場合はrefreshしない', async () => {
    jest
      .spyOn(supabase.auth, 'getUser')
      .mockResolvedValue({ data: { user: null }, error: new AuthError('Not authenticated') });

    const mockOnAuthHandler = jest.fn();
    const mockUnsubscribe = jest.fn();
    jest
      .spyOn(supabase.auth, 'onAuthStateChange')
      .mockImplementation((callback: AuthStateChangeCallback) => {
        mockOnAuthHandler.mockImplementation(callback);
        return { data: { subscription: createMockSubscription(mockUnsubscribe) } };
      });

    render(<SupabaseListener />);

    await act(async () => {
      await mockOnAuthHandler(null, null);
    });

    await waitFor(() => {
      expect(mockUpdateLoginUser).toHaveBeenCalledWith({
        id: null,
        email: null,
        auth: undefined,
      });
    });
    // serverUserId が未設定で session も null → もともと未ログインなので refresh 不要
    expect(mockRouterRefresh).not.toHaveBeenCalled();
  });

  test('同一ユーザーでトークンのみ更新された場合はrefreshしない', async () => {
    jest
      .spyOn(supabase.auth, 'getUser')
      .mockResolvedValue({ data: { user: null }, error: new AuthError('Not authenticated') });

    const mockOnAuthHandler = jest.fn();
    const mockUnsubscribe = jest.fn();
    jest
      .spyOn(supabase.auth, 'onAuthStateChange')
      .mockImplementation((callback: AuthStateChangeCallback) => {
        mockOnAuthHandler.mockImplementation(callback);
        return { data: { subscription: createMockSubscription(mockUnsubscribe) } };
      });

    mockUseFetchMember.mockReturnValue({
      memberData: [{ admin: true }],
      postgrestError: null,
      swrError: undefined,
      isLoading: false,
    });

    // serverUserId と session.user.id が同じ → トークンだけ変わったケース
    render(<SupabaseListener serverUserId="sameUserId" />);

    await act(async () => {
      await mockOnAuthHandler(null, {
        user: { id: 'sameUserId', email: 'same@example.com' },
        access_token: 'newRefreshedToken',
      });
    });

    await waitFor(() => {
      expect(mockUpdateLoginUser).toHaveBeenCalledWith({
        id: 'sameUserId',
        email: 'same@example.com',
        auth: true,
      });
    });
    // user.id が同じなので refresh は不要（トークンリフレッシュによる不要な refresh を防止）
    expect(mockRouterRefresh).not.toHaveBeenCalled();
  });

  test('getUser が真正なエラーを返した場合はwarnしてupdateLoginUserを呼ばない', async () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    jest
      .spyOn(supabase.auth, 'getUser')
      .mockResolvedValue({ data: { user: null }, error: new AuthError('Network error') });

    const mockUnsubscribe = jest.fn();
    jest.spyOn(supabase.auth, 'onAuthStateChange').mockReturnValue({
      data: { subscription: createMockSubscription(mockUnsubscribe) },
    });

    render(<SupabaseListener serverUserId="123" />);

    await waitFor(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[SupabaseListener] ユーザー情報取得に失敗:',
        'Network error',
      );
    });
    // error 時は updateLoginUser を呼ばない
    expect(mockUpdateLoginUser).not.toHaveBeenCalled();
  });

  test('getUser が未ログイン相当のエラーを返した場合はwarnを出さない', async () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const getUserSpy = jest.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: { user: null },
      error: new AuthError('Auth session missing!'),
    });

    const mockUnsubscribe = jest.fn();
    jest.spyOn(supabase.auth, 'onAuthStateChange').mockReturnValue({
      data: { subscription: createMockSubscription(mockUnsubscribe) },
    });

    render(<SupabaseListener />);

    // まず getUser が呼ばれたことを待ち、非同期処理の完了を担保する
    await waitFor(() => {
      expect(getUserSpy).toHaveBeenCalled();
    });
    // 非同期処理完了後に warn が出ていないことを確認
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    // 未ログイン相当なので updateLoginUser も呼ばない
    expect(mockUpdateLoginUser).not.toHaveBeenCalled();
  });

  test('getUser でemailがnull/undefinedのユーザーの場合、auth undefinedで更新される', async () => {
    jest.spyOn(supabase.auth, 'getUser').mockResolvedValue({
      data: {
        user: createMockUser({ id: 'no-email-user' }),
      },
      error: null,
    });

    const mockUnsubscribe = jest.fn();
    jest.spyOn(supabase.auth, 'onAuthStateChange').mockReturnValue({
      data: { subscription: createMockSubscription(mockUnsubscribe) },
    });

    render(<SupabaseListener serverUserId="no-email-user" />);

    await waitFor(() => {
      expect(mockUpdateLoginUser).toHaveBeenCalledWith({
        id: 'no-email-user',
        email: null,
        auth: undefined,
      });
    });
    // emailがnullのため、useFetchMemberに文字列emailは渡されない
    expect(mockUseFetchMember).not.toHaveBeenCalledWith(expect.any(String));
  });
});
