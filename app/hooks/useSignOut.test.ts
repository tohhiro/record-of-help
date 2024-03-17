import { renderHook } from '@testing-library/react';
import { useSignOut } from './useSignOut';

jest.mock('../libs/supabase', () => ({
  supabase: {
    auth: {
      signOut: jest.fn().mockResolvedValueOnce(undefined),
    },
  },
}));

describe('useSignOut', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('signOut関数を呼び出すとundefinedがかえる', async () => {
    const { result } = renderHook(() => useSignOut());

    await expect(result.current.signOut()).resolves.toBe(undefined);
  });
});

// TODO: エラーの場合のmockとハッピーパスのmockをdescribeやtestなどでラップしても共存できない
// jest.mock('../libs/supabase', () => ({
//   supabase: {
//     auth: {
//       signOut: jest.fn().mockRejectedValueOnce({
//         error: {
//           name: 'AuthError',
//           message: 'Your signOut is encounter the Error.',
//           status: 400,
//         },
//       }),
//     },
//   },
// }));

// describe('useSignOut', () => {
//   test('SignOutがエラーになる', async () => {
//     const { result } = renderHook(() => useSignOut());

//     await expect(result.current.signOut()).rejects.toMatchObject({
//       error: {
//         name: 'AuthError',
//         message: 'Your signOut is encounter the Error.',
//         status: 400,
//       },
//     });
//   });
// });
