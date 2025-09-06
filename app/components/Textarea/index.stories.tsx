import { type Meta, type StoryObj } from '@storybook/react';
import { Textarea, type Props } from '.';

export default {
  title: 'app/components/Textarea',
  component: Textarea,
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

const mockData: Props = {
  id: 'textarea',
  label: 'Textareaラベル',
  placeholder: 'Textareaプレースホルダー',
};

export const Default: Story = { args: mockData };
