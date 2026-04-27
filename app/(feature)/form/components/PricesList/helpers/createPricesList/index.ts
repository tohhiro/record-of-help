import { type PricesHelpsList } from '@/app/types';

export const createPricesList = (pricesListRaw: PricesHelpsList['data'] | undefined) => {
  if (!pricesListRaw) return undefined;

  const pricesList = pricesListRaw.map((item) => ({
    id: item.id,
    label: item.label,
    column: item.help,
    value: item.prices_list[0]?.price ?? 0,
  }));

  return pricesList;
};
