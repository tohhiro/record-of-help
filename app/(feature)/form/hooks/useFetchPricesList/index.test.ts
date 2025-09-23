import { supabase } from '@/app/libs/supabase';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchPricesList } from '.';

jest.mock('@/app/libs/supabase');
const mockedSupabase = jest.mocked(supabase);

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
    jest.clearAllMocks();
  });

  test('dataが存在し、errorはnullの場合、dataが取得できる', async () => {
    // supabaseのメソッドチェーンをモック化
    const mockSelect = jest.fn().mockResolvedValue({
      data: [dummyData],
      error: null,
    });

    const mockFrom = jest.fn().mockReturnValue({
      select: mockSelect,
    });

    mockedSupabase.from = mockFrom;

    const { result } = renderHook(() => useFetchPricesList());

    await waitFor(() => {
      expect(result.current?.error).toBeNull();
      expect(result.current?.data).toStrictEqual([dummyData]);
    });
  });
});
