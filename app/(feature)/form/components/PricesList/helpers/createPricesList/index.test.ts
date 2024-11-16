import { createPricesList } from '.';
import { mockPricesList, mockPricesListRaw, mockPricesListErrorRaw } from '@/mocks/pricesList';

describe('createPricesList', () => {
  test('rawデータからpricesListを生成する', () => {
    const pricesList = createPricesList(mockPricesListRaw);
    expect(pricesList).toStrictEqual(mockPricesList);
  });

  test('rawデータにエラーがある場合はnullになる', () => {
    const pricesList = createPricesList(mockPricesListErrorRaw);
    expect(pricesList).toBeNull();
  });
});
