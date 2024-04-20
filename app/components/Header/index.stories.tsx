import React from 'react';
import { Header, NavAdminType, NavMemberType } from '.';

export default {
  title: 'app/components/Header',
  component: Header,
};

const mockNavAdminItems: NavAdminType = {
  Form: './form',
  Dashboard: './dashboard',
};

const mockNavMemberItems: NavMemberType = {
  Dashboard: './dashboard',
};

export const Admin: React.FC = (): JSX.Element => {
  return <Header links={mockNavAdminItems} onClick={() => {}} />;
};

export const Member: React.FC = (): JSX.Element => {
  return <Header links={mockNavMemberItems} onClick={() => {}} />;
};
