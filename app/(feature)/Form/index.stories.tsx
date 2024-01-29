import React from 'react';
import Page from './page';
import { mockNextRouter } from '../../../mocks/common/mockNextRouter';

export default {
  title: 'app/feature/form',
  component: Page,
};

const { nextjs } = mockNextRouter('/form');

export const Default = (): JSX.Element => {
  return <Page />;
};

Default.parameters = {
  nextjs,
};
