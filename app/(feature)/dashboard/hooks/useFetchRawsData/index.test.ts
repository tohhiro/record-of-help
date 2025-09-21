import { supabase } from '@/app/libs/supabase';
import { mockRawsData } from '@/mocks/rawsData';
import { act, renderHook, waitFor } from '@testing-library/react';
import useSWR, { mutate } from 'swr';
import { useFetchRawsData, type ConditionsArgsType } from './index';

jest.mock('@/app/libs/supabase');
jest.mock('swr');

const mockedSupabase = jest.mocked(supabase);
const mockedUseSWR = jest.mocked(useSWR);
const mockedMutate = jest.mocked(mutate);

// Supabaseチェーンのモック
const createMockSupabaseChain = () => {
  const mockChain = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lte: jest.fn(),
  };

  // lteメソッドは戻り値によって分岐する
  mockChain.lte.mockImplementation(() => {
    // personなしの場合は直接結果を返す
    return Promise.resolve({ data: mockRawsData.data, error: null });
  });

  // eqメソッドを持つチェーンも作成
  const mockChainWithEq = {
    ...mockChain,
    eq: jest.fn().mockResolvedValue({ data: mockRawsData.data, error: null }),
  };

  // 条件によって異なるチェーンを返す
  mockChain.lte.mockReturnValue(mockChainWithEq);

  return mockChain;
};

describe('useFetchRawsData', () => {
  const commonMockData = {
    data: null,
    error: null,
    isLoading: false,
    isValidating: false,
    mutate: jest.fn(),
  };

  let mockSupabaseChain: ReturnType<typeof createMockSupabaseChain>;

  beforeEach(() => {
    jest.clearAllMocks();

    // 固定日時を設定（2023年1月15日）
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-01-15T12:00:00Z'));

    // Supabaseチェーンモックを初期化
    mockSupabaseChain = createMockSupabaseChain();
    // 型エラー回避のため any キャスト
    mockedSupabase.from.mockReturnValue(mockSupabaseChain as any);

    mockedUseSWR.mockReturnValue({
      ...commonMockData,
      data: { data: mockRawsData.data, error: null },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('初期化テスト', () => {
    test('フックが正常に初期化され、今月のデータを取得する', async () => {
      const { result } = renderHook(() => useFetchRawsData());

      await waitFor(() => {
        expect(result.current.success.rawsData).toEqual(mockRawsData.data);
      });

      // useSWRが正しいキーで呼ばれることを確認
      expect(mockedUseSWR).toHaveBeenCalledWith('raws_data', expect.any(Function));
    });

    test('データがnullの場合、rawsDataがnullになる', async () => {
      mockedUseSWR.mockReturnValue({
        ...commonMockData,
      });

      const { result } = renderHook(() => useFetchRawsData());

      await waitFor(() => {
        expect(result.current.success.rawsData).toBeNull();
      });
    });

    test('データのdataプロパティがnullの場合、rawsDataがnullになる', async () => {
      mockedUseSWR.mockReturnValue({
        ...commonMockData,
        data: { data: null, error: null },
      });

      const { result } = renderHook(() => useFetchRawsData());

      await waitFor(() => {
        expect(result.current.success.rawsData).toBeNull();
      });
    });
  });

  describe('conditionsFetch テスト', () => {
    test('条件指定でデータを取得できる', async () => {
      const conditionsArgs: ConditionsArgsType = {
        startDate: '2023-02-01',
        endDate: '2023-02-28',
        person: 'テストユーザー1',
      };

      const mockMutateResult = { data: mockRawsData.data, error: null };
      mockedMutate.mockResolvedValue(mockMutateResult);

      const { result } = renderHook(() => useFetchRawsData());

      // conditionsFetchを実行
      await act(async () => {
        result.current.conditionsFetch(conditionsArgs);
      });

      await waitFor(() => {
        // mutateが正しいキーで呼ばれることを確認
        expect(mockedMutate).toHaveBeenCalledWith(
          `raws_data_conditions/${conditionsArgs.startDate}/${conditionsArgs.endDate}/${conditionsArgs.person}`,
          expect.any(Promise),
        );
        // データが更新されることを確認
        expect(result.current.success.rawsData).toEqual(mockRawsData.data);
      });
    });

    test('personが指定されていない場合でも正常に動作する', async () => {
      const conditionsArgs: ConditionsArgsType = {
        startDate: '2023-02-01',
        endDate: '2023-02-28',
      };

      const mockMutateResult = { data: mockRawsData.data, error: null };
      mockedMutate.mockResolvedValue(mockMutateResult);

      const { result } = renderHook(() => useFetchRawsData());

      await act(async () => {
        result.current.conditionsFetch(conditionsArgs);
      });

      await waitFor(() => {
        expect(mockedMutate).toHaveBeenCalledWith(
          `raws_data_conditions/${conditionsArgs.startDate}/${conditionsArgs.endDate}/undefined`,
          expect.any(Promise),
        );
      });
    });

    test('mutateでエラーが発生した場合、rawsDataがnullになる', async () => {
      const conditionsArgs: ConditionsArgsType = {
        startDate: '2023-02-01',
        endDate: '2023-02-28',
        person: 'テストユーザー1',
      };

      mockedMutate.mockResolvedValue(null);

      const { result } = renderHook(() => useFetchRawsData());

      await act(async () => {
        result.current.conditionsFetch(conditionsArgs);
      });

      await waitFor(() => {
        expect(result.current.success.rawsData).toBeNull();
      });
    });
  });

  describe('fetcherの動作テスト', () => {
    test('初期fetcherが正しく動作する', async () => {
      renderHook(() => useFetchRawsData());

      // useSWRに渡されたfetcher関数を取得して実行
      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      if (fetcherFunction) {
        await act(async () => {
          await fetcherFunction();
        });

        // Supabaseクエリが正しく呼ばれることを確認
        expect(mockedSupabase.from).toHaveBeenCalledWith('raws_data');
        expect(mockSupabaseChain.select).toHaveBeenCalledWith('*');
        expect(mockSupabaseChain.eq).toHaveBeenCalledWith('del_flag', false);
        expect(mockSupabaseChain.order).toHaveBeenCalledWith('created_at', { ascending: true });
      }
    });

    test('日付範囲でフィルタリングされる', async () => {
      renderHook(() => useFetchRawsData());

      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      if (fetcherFunction) {
        await act(async () => {
          await fetcherFunction();
        });

        await waitFor(() => {
          // 2023年1月の範囲でフィルタリングされることを確認
          expect(mockSupabaseChain.gte).toHaveBeenCalledWith('created_at', '2023-01-01 00:00:00');
          expect(mockSupabaseChain.lte).toHaveBeenCalledWith('created_at', '2023-01-31 23:59:59');
        });
      }
    });

    test('異なる月に設定した場合の日付範囲フィルタリング', async () => {
      // 2023年2月15日に設定
      jest.setSystemTime(new Date('2023-02-15T12:00:00Z'));

      renderHook(() => useFetchRawsData());

      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      if (fetcherFunction) {
        await act(async () => {
          await fetcherFunction();
        });

        await waitFor(() => {
          // 2023年2月の範囲でフィルタリングされることを確認
          expect(mockSupabaseChain.gte).toHaveBeenCalledWith('created_at', '2023-02-01 00:00:00');
          expect(mockSupabaseChain.lte).toHaveBeenCalledWith('created_at', '2023-02-28 23:59:59');
        });
      }
    });
  });
});
