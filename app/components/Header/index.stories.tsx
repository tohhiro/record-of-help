import React from 'react';
import { Header, NavAdminType, NavMemberType } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/components/Header',
  component: Header,
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

const mockNavAdminItems: NavAdminType = {
  Form: './form',
  Dashboard: './dashboard',
};

const mockNavMemberItems: NavMemberType = {
  Dashboard: './dashboard',
};

export const Admin: Story = {
  args: {
    links: mockNavAdminItems,
    onClick: () => {},
    loginUser: 'test@test.com',
  },
  render: (args) => <Header {...args} />,
};

export const Member: Story = {
  args: {
    links: mockNavMemberItems,
    onClick: () => {},
    loginUser: 'test@test.com',
  },
  render: (args) => <Header {...args} />,
};

export const NotLogin: Story = {
  args: {
    links: mockNavMemberItems,
    onClick: () => {},
  },
  render: (args) => <Header {...args} />,
};
