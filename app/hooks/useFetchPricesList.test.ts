import { renderHook, waitFor } from '@testing-library/react';
import { useFetchPricesList } from './useFetchPricesList';

jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn().mockReturnValue({
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
  test('returns data, error, and isLoading correctly', async () => {
    const { result } = renderHook(() => useFetchPricesList());

    expect(result.current?.isLoading).toBe(true);

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
