import { http, HttpResponse } from 'msw';
import { mockPricesListRaw } from '@/mocks/pricesList';

export const handler = [
  http.get(`${process.env.SUPABASE_URL}${process.env.PRICES_LIST_ENDPOINT}`, () => {
    return HttpResponse.json(mockPricesListRaw.data);
  }),
];