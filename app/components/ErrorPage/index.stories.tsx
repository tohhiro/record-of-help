import { type Meta, type StoryObj } from '@storybook/react';
import ErrorPage from '.';

export default {
  title: 'app/components/ErrorPage',
  component: ErrorPage,
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta<typeof ErrorPage>;

type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {};
