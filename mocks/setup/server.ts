import { setupServer } from 'msw/node';
import { handler } from '../handlers/pricesList';

export const server = setupServer(...handler);
