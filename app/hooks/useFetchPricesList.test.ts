import { renderHook, waitFor } from '@testing-library/react';
import { useFetchPricesList } from './useFetchPricesList'; // あなたのカスタムフックファイルへのパス

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        data: [
          {
            created_at: '2024-02-23T12:00:00.000Z',
            help: 'Some help',
            id: '1',
            label: 'Some label',
            update_at: null,
            prices_list: [
              {
                created_at: '2024-02-23T12:00:00.000Z',
                help_id: '1',
                id: '1',
                price: 10,
                update_at: null,
              },
            ],
          },
        ],
        error: null,
      }),
    }),
  }),
}));

describe('useFetchPricesList', () => {
  it('returns data, error, and isLoading correctly', async () => {
    // supabase の from 関数をモック化し、適切な戻り値を設定

    // カスタムフックをレンダリング
    const { result } = renderHook(() => useFetchPricesList());

    // フックがロード中であることを確認
    expect(result.current?.isLoading).toBe(true);

    // フックがデータを読み込んだ後、戻り値が期待通りであることを確認
    await waitFor(() => {
      expect(result.current?.isLoading).toBe(false);
      expect(result.current?.error).toBeNull();
      expect(result.current?.data).toEqual([
        {
          created_at: '2024-02-23T12:00:00.000Z',
          help: 'Some help',
          id: '1',
          label: 'Some label',
          update_at: null,
          prices_list: [
            {
              created_at: '2024-02-23T12:00:00.000Z',
              help_id: '1',
              id: '1',
              price: 10,
              update_at: null,
            },
          ],
        },
      ]);
    });
  });
});
