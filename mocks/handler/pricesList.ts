import { http, HttpResponse } from 'msw';
import { mockPricesListRaw } from '@/mocks/pricesList';

export const handlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}${process.env.NEXT_PUBLIC_PRICES_LIST_ENDPOINT}`,
    () => {
      return HttpResponse.json(mockPricesListRaw.data);
    },
  ),
];
