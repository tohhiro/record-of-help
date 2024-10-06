import type { Preview } from '@storybook/react';
import '../app/styles/globals.css';
// import { initialize, mswDecorator } from 'msw-storybook-addon';
// initialize();

const preview: Preview = {
  // decorators: [mswDecorator],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // loaders: [mswLoader],
};

export default preview;
