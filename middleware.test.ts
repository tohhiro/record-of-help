import { createServerClient } from '@supabase/ssr';

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => ({
      cookies: { set: jest.fn() },
      headers: new Headers(),
      status: 200,
    })),
    redirect: jest.fn((url: URL) => ({
      cookies: { set: jest.fn() },
      headers: new Headers({ location: url.toString() }),
      status: 307,
    })),
  },
}));

if (typeof global.Request === 'undefined') {
  global.Request = class Request {} as unknown as typeof Request;
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {} as typeof Response;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { middleware } = require('./middleware') as typeof import('./middleware');

const mockedCreateServerClient = jest.mocked(createServerClient);

const createSupabaseMock = (user: unknown) => {
  const auth = {
    getUser: jest.fn().mockResolvedValue({
      data: { user },
    }),
  };

  return {
    auth,
    cookies: {
      getAll: jest.fn().mockReturnValue([]),
      setAll: jest.fn(),
    },
  };
};

const createRequest = (pathname: string) => {
  const url = new URL(`https://example.com${pathname}`);

  return {
    headers: new Headers(),
    cookies: {
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn(),
    },
    nextUrl: {
      clone: () => new URL(url),
      pathname: url.pathname,
    },
  } as unknown as Parameters<typeof middleware>[0];
};

describe('middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('未認証ユーザーが保護されたパスにアクセスすると /login にリダイレクトされる', async () => {
    mockedCreateServerClient.mockReturnValue(createSupabaseMock(null));
    const request = createRequest('/dashboard');

    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://example.com/login');
  });

  test('認証済みユーザーは元のレスポンスが返る', async () => {
    mockedCreateServerClient.mockReturnValue(createSupabaseMock({ id: 'user-1' }));
    const request = createRequest('/dashboard');

    const response = await middleware(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });
});