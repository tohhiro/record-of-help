import { Textarea, Props } from '.';
import { StoryObj, Meta } from '@storybook/react';

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
