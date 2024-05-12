import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Page from './page';

export default {
  title: 'app/feature/Dashboard',
  component: Page,
} as Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: () => <Page />,
};
