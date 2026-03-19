import {
  mockFormattedPricesList,
  mockPricesListErrorRaw,
  mockPricesListRaw,
} from '@/mocks/pricesList';
import { type PricesHelpsList } from '@/app/types';
import { createPricesList } from '.';

describe('createPricesList', () => {
  test('rawデータからpricesListを生成する', () => {
    const pricesList = createPricesList(mockPricesListRaw);
    expect(pricesList).toStrictEqual(mockFormattedPricesList);
  });

  test('rawデータにエラーがある場合はnullになる', () => {
    const pricesList = createPricesList(mockPricesListErrorRaw);
    expect(pricesList).toBeNull();
  });

  test('prices_listが空配列の場合はvalueが0になる', () => {
    const rawWithEmptyPrices: PricesHelpsList = {
      data: [
        {
          created_at: '2021-10-01T00:00:00.000000Z',
          help: 'dish',
          id: 'dish',
          label: '皿洗い',
          update_at: null,
          prices_list: [],
        },
      ],
      error: null,
    };
    const pricesList = createPricesList(rawWithEmptyPrices);
    expect(pricesList).toStrictEqual([
      { id: 'dish', label: '皿洗い', column: 'dish', value: 0 },
    ]);
  });
});
