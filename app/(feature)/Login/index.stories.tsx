import React from 'react';
import Page from './page';
import { mockNextRouter } from '../../../mocks/common/mockNextRouter';
import { mockUseSignInHandler } from '../../../mocks/msw/handlers/mockUseSignIn';

export default {
  title: 'app/feature/Login',
  component: Page,
};

const { nextjs } = mockNextRouter('/login');

export const Default = (): JSX.Element => {
  return <Page />;
};

Default.parameters = {
  nextjs,
  msw: {
    handlers: [mockUseSignInHandler.start()],
  },
};
