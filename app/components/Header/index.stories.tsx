import { Header, NavAdminType, NavMemberType } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/components/Header',
  component: Header,
} satisfies Meta<typeof Header>;

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
};

export const Member: Story = {
  args: {
    links: mockNavMemberItems,
    onClick: () => {},
    loginUser: 'test@test.com',
  },
};

export const NotLogin: Story = {
  args: {
    links: mockNavMemberItems,
    onClick: () => {},
  },
};
