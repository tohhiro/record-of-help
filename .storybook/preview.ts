import type { Preview } from '@storybook/react';
import '../app/styles/globals.css';
import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';

initialize();

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
