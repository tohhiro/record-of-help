import { Meta, StoryObj } from '@storybook/react';
import { Props, Textarea } from '.';

export default {
  title: 'app/components/Textarea',
  component: Textarea,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

const mockData: Props = {
  id: 'textarea',
  label: 'Textareaラベル',
  placeholder: 'Textareaプレースホルダー',
};

export const Default: Story = {
  args: mockData,
};
