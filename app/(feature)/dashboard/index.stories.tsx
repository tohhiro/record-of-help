import { StoryObj, Meta } from '@storybook/react';
import Page from './page';

export default {
  title: 'app/feature/Dashboard',
  component: Page,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies Meta<typeof Page>;

type Story = StoryObj<typeof Page>;

export const Default: Story = {};
