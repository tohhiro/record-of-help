import { supabase } from '@/app/libs/supabase';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchPricesList } from '.';

jest.mock('../../../../libs/supabase');
const mockedSupabase = jest.mocked(supabase.from);
const dummyData = {
  created_at: '2024-02-23T12:00:00.000Z',
  help: 'Something help',
  id: '1',
  label: 'Something label',
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
};

describe('useFetchPricesList', () => {
  afterEach(() => {
    mockedSupabase.mockReset();
  });

  test('dataが存在し、errorはnullの場合、dataが取得できる', async () => {
    // supabaseの返り値をモック化
    mockedSupabase.mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: [dummyData],
        error: null,
      }),
    } as unknown as ReturnType<typeof supabase.from>);

    const { result } = renderHook(() => useFetchPricesList());

    await waitFor(() => {
      expect(result.current?.error).toBeNull();
      expect(result.current?.data).toStrictEqual([dummyData]);
    });
  });
});
