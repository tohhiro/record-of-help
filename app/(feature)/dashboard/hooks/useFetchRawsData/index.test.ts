import { supabase } from '@/app/libs/supabase';
import { mockRawsData } from '@/mocks/rawsData';
import { act, renderHook, waitFor } from '@testing-library/react';
import useSWR from 'swr';
import { useFetchRawsData, type ConditionsArgsType } from './index';

const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockOrder = jest.fn();
const mockGte = jest.fn();
const mockLte = jest.fn();

jest.mock('@/app/libs/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: mockSelect,
    })),
  },
}));

jest.mock('swr');

const mockedUseSWR = jest.mocked(useSWR);

describe('useFetchRawsData', () => {
  const commonMockData = {
    data: null,
    error: null,
    isLoading: false,
    isValidating: false,
    mutate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // 固定日時を設定（2023年1月15日）
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-01-15T12:00:00Z'));

    // Supabaseチェーンモックを構成
    const chain = { eq: mockEq, order: mockOrder, gte: mockGte, lte: mockLte };
    mockSelect.mockReturnValue(chain);
    mockEq.mockReturnValue(chain);
    mockOrder.mockReturnValue(chain);
    mockGte.mockReturnValue(chain);

    // lteの戻り値:
    // - person指定時: .eq() チェーンで { data, error } を返す
    // - person未指定時: await ...lte(...) で { data, error } を返す（thenable として振る舞う）
    const chainAfterLte = {
      eq: jest.fn().mockResolvedValue({ data: mockRawsData.data, error: null }),
      then: (
        _onFulfilled: (_value: { data: typeof mockRawsData.data; error: null }) => unknown,
      ) => _onFulfilled({ data: mockRawsData.data, error: null }),
    };
    mockLte.mockReturnValue(chainAfterLte);

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

      // useSWRが今月の日付範囲を含むキーで呼ばれることを確認
      expect(mockedUseSWR).toHaveBeenCalledWith(
        'raws_data/2023-01-01/2023-01-31/',
        expect.any(Function),
      );
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
    test('条件指定でSWRキーが更新される', async () => {
      const conditionsArgs: ConditionsArgsType = {
        startDate: '2023-02-01',
        endDate: '2023-02-28',
        person: 'テストユーザー1',
      };

      const { result } = renderHook(() => useFetchRawsData());

      // conditionsFetchを実行してstateを更新
      await act(async () => {
        result.current.conditionsFetch(conditionsArgs);
      });

      await waitFor(() => {
        // useSWRが新しいキーで呼ばれることを確認
        expect(mockedUseSWR).toHaveBeenCalledWith(
          `raws_data/${conditionsArgs.startDate}/${conditionsArgs.endDate}/${conditionsArgs.person}`,
          expect.any(Function),
        );
      });
    });

    test('personが指定されていない場合でも正常にキーが生成される', async () => {
      const conditionsArgs: ConditionsArgsType = {
        startDate: '2023-02-01',
        endDate: '2023-02-28',
      };

      const { result } = renderHook(() => useFetchRawsData());

      await act(async () => {
        result.current.conditionsFetch(conditionsArgs);
      });

      await waitFor(() => {
        expect(mockedUseSWR).toHaveBeenCalledWith(
          `raws_data/${conditionsArgs.startDate}/${conditionsArgs.endDate}/`,
          expect.any(Function),
        );
      });
    });

    test('同一条件での再検索時にmutateが実行される', async () => {
      const mockMutate = jest.fn();
      mockedUseSWR.mockReturnValue({
        ...commonMockData,
        data: { data: mockRawsData.data, error: null },
        mutate: mockMutate,
      });

      // 初期条件と同一の条件を渡す（2023-01-01〜2023-01-31, person: ''）
      const conditionsArgs: ConditionsArgsType = {
        startDate: '2023-01-01',
        endDate: '2023-01-31',
        person: '',
      };

      const { result } = renderHook(() => useFetchRawsData());

      await act(async () => {
        result.current.conditionsFetch(conditionsArgs);
      });

      expect(mockMutate).toHaveBeenCalled();
    });

    test('異なる条件での検索時にmutateが実行されない', async () => {
      const mockMutate = jest.fn();
      mockedUseSWR.mockReturnValue({
        ...commonMockData,
        data: { data: mockRawsData.data, error: null },
        mutate: mockMutate,
      });

      const conditionsArgs: ConditionsArgsType = {
        startDate: '2023-02-01',
        endDate: '2023-02-28',
        person: 'テストユーザー1',
      };

      const { result } = renderHook(() => useFetchRawsData());

      await act(async () => {
        result.current.conditionsFetch(conditionsArgs);
      });

      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  describe('fetcherの動作テスト', () => {
    test('初期fetcherが正しく動作する', async () => {
      renderHook(() => useFetchRawsData());

      // useSWRに渡されたfetcher関数を取得して実行
      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      expect(fetcherFunction).toBeDefined();
      await act(async () => {
        await fetcherFunction!();
      });

      // Supabaseクエリが正しく呼ばれることを確認
      expect(supabase.from).toHaveBeenCalledWith('raws_data');
      expect(mockSelect).toHaveBeenCalledWith('*');
      expect(mockEq).toHaveBeenCalledWith('del_flag', false);
      expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: true });
    });

    test('日付範囲でフィルタリングされる', async () => {
      renderHook(() => useFetchRawsData());

      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      expect(fetcherFunction).toBeDefined();
      await act(async () => {
        await fetcherFunction!();
      });

      await waitFor(() => {
        // 2023年1月の範囲でフィルタリングされることを確認
        expect(mockGte).toHaveBeenCalledWith('created_at', '2023-01-01 00:00:00');
        expect(mockLte).toHaveBeenCalledWith('created_at', '2023-01-31 23:59:59');
      });
    });

    test('異なる月に設定した場合の日付範囲フィルタリング', async () => {
      // 2023年2月15日に設定
      jest.setSystemTime(new Date('2023-02-15T12:00:00Z'));

      renderHook(() => useFetchRawsData());

      const swrCall = mockedUseSWR.mock.calls[0];
      const fetcherFunction = swrCall[1];

      expect(fetcherFunction).toBeDefined();
      await act(async () => {
        await fetcherFunction!();
      });

      await waitFor(() => {
        // 2023年2月の範囲でフィルタリングされることを確認
        expect(mockGte).toHaveBeenCalledWith('created_at', '2023-02-01 00:00:00');
        expect(mockLte).toHaveBeenCalledWith('created_at', '2023-02-28 23:59:59');
      });
    });
  });
});
