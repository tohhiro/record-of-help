import type { Preview } from '@storybook/react';
import '../app/styles/globals.css';
import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';

initialize();

if (typeof window === 'undefined') {
  // Node.js 環境ではサーバーモードを使う
  const { setupServer } = require('msw/node');
  const { handlers } = require('../src/mocks/handlers');

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
} else {
  // ブラウザ環境では通常の worker を使う
  const { worker } = require('../src/mocks/browser');
  worker.start();
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [mswDecorator],
  loaders: [mswLoader],
};

export default preview;
