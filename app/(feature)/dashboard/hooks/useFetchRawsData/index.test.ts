import { supabase } from '@/app/libs/supabase';
import { mockRawsData } from '@/mocks/rawsData';
import { act, renderHook, waitFor } from '@testing-library/react';
import useSWR, { mutate } from 'swr';
import { getNowMonthFirstLast } from './helpers';
import { useFetchRawsData, type ConditionsArgsType } from './index';

jest.mock('@/app/libs/supabase');
jest.mock('swr');
jest.mock('./helpers');

const mockedSupabase = supabase as jest.Mocked<typeof supabase>;
const mockedUseSWR = useSWR as jest.MockedFunction<typeof useSWR>;
const mockedMutate = mutate as jest.MockedFunction<typeof mutate>;
const mockedGetNowMonthFirstLast = getNowMonthFirstLast as jest.MockedFunction<
  typeof getNowMonthFirstLast
>;

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
  let mockSupabaseChain: ReturnType<typeof createMockSupabaseChain>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Supabaseチェーンモックを初期化
    mockSupabaseChain = createMockSupabaseChain();
    mockedSupabase.from.mockReturnValue(mockSupabaseChain as any);

    // デフォルトのモック設定
    mockedGetNowMonthFirstLast.mockReturnValue({
      startDate: '2023-01-01',
      endDate: '2023-01-31',
    });

    mockedUseSWR.mockReturnValue({
      data: { data: mockRawsData.data, error: null },
      error: null,
      isLoading: false,
      isValidating: false,
      mutate: jest.fn(),
    } as any);
  });

  describe('初期化テスト', () => {
    test('フックが正常に初期化され、今月のデータを取得する', async () => {
      const { result } = renderHook(() => useFetchRawsData());

      await waitFor(() => {
        expect(result.current.success.rawsData).toEqual(mockRawsData.data);
      });

      // getNowMonthFirstLastが呼ばれることを確認
      expect(mockedGetNowMonthFirstLast).toHaveBeenCalled();

      // useSWRが正しいキーで呼ばれることを確認
      expect(mockedUseSWR).toHaveBeenCalledWith('raws_data', expect.any(Function));
    });

    test('データがnullの場合、rawsDataがnullになる', async () => {
      mockedUseSWR.mockReturnValue({
        data: null,
        error: null,
        isLoading: false,
        isValidating: false,
        mutate: jest.fn(),
      } as any);

      const { result } = renderHook(() => useFetchRawsData());

      await waitFor(() => {
        expect(result.current.success.rawsData).toBeNull();
      });
    });

    test('データのdataプロパティがnullの場合、rawsDataがnullになる', async () => {
      mockedUseSWR.mockReturnValue({
        data: { data: null, error: null },
        error: null,
        isLoading: false,
        isValidating: false,
        mutate: jest.fn(),
      } as any);

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
          expect(mockSupabaseChain.gte).toHaveBeenCalledWith('created_at', '2023-01-01 00:00:00');
          expect(mockSupabaseChain.lte).toHaveBeenCalledWith('created_at', '2023-01-31 23:59:59');
        });
      }
    });
  });
});
