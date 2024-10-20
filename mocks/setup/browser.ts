import { setupWorker } from 'msw/browser';
import { handler } from '../handlers/pricesList';

export const worker = setupWorker(...handler);
