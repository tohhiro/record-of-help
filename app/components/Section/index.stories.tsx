import { Meta, StoryObj } from '@storybook/react';
import { Section } from '.';

export default {
  title: 'app/components/Section',
  component: Section,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies Meta<typeof Section>;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: { children: 'Sectionコンポーネント' },
};
