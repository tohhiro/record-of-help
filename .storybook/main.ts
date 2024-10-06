import type { StorybookConfig } from '@storybook/nextjs';
const path = require('path');

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {},
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [],
  webpackFinal: async (config: any) => {
    // Add path aliases
    config.resolve.alias['@'] = path.resolve(__dirname, '../');
    return config;
  },
};
export default config;
