import { PricesHelpsList } from '@/app/types';

export const createPricesList = (pricesListRaw: PricesHelpsList | undefined) => {
  if (pricesListRaw?.error) return null;

  const pricesList = pricesListRaw?.data?.map((item) => ({
    id: item.id,
    label: item.label,
    column: item.help,
    value: item.prices_list[0].price,
  }));

  return pricesList;
};
