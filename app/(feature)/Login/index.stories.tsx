import React from 'react';
import Page from './page';
import { mockUseSignInHandler } from '../../../mocks/msw/handlers/mockUseSignIn';

export default {
  title: 'app/feature/Login',
  component: Page,
};

export const Default = (): JSX.Element => {
  return <Page />;
};

Default.parameters = {
  nextjs: {
    appDirectory: true,
    navigation: {
      pathname: '/posts',
    },
  },
  msw: {
    handlers: [mockUseSignInHandler.start()],
  },
};
