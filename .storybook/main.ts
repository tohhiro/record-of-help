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
  staticDirs: ['../public'],
  env: (config) => ({
    ...config,
    // 環境変数をStorybookに明示的に渡す
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    PRICES_LIST_ENDPOINT: process.env.PRICES_LIST_ENDPOINT || '',
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || 'development',
  }),
  webpackFinal: async (config: any) => {
    // Add path aliases
    config.resolve.alias['@'] = path.resolve(__dirname, '../');
    
    // 環境変数のデバッグ出力（CI環境でのみ）
    if (process.env.CI) {
      console.log('Environment variables in Storybook:');
      console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing');
      console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing');
      console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Set' : '✗ Missing');
      console.log('PRICES_LIST_ENDPOINT:', process.env.PRICES_LIST_ENDPOINT ? '✓ Set' : '✗ Missing');
    }
    
    return config;
  },
};
export default config;
