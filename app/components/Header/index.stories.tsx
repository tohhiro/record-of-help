import React from 'react';
import { Header, NavType } from '.';

export default {
  title: 'app/components/Header',
  component: Header,
};

const mockNavItems: NavType = {
  Form: './form',
  Dashboard: './dashboard',
};

export const Default: React.FC = (): JSX.Element => {
  return <Header links={mockNavItems} onClick={() => {}} />;
};
