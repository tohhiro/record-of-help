import { mockPricesListRaw } from '@/mocks/pricesList';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`${process.env.SUPABASE_URL}${process.env.PRICES_LIST_ENDPOINT}`, () => {
    return HttpResponse.json(mockPricesListRaw.data);
  }),
];
