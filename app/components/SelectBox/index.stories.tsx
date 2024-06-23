import { SelectBox, Props } from '.';
import { StoryObj, Meta } from '@storybook/react';

export default {
  title: 'app/components/SelectBox',
  component: SelectBox,
} as Meta<typeof SelectBox>;

type Story = StoryObj<typeof SelectBox>;

const mockOptions: Props[] = [
  { value: 'all', label: 'All' },
  { value: 'eito', label: 'Eito' },
  { value: 'mei', label: 'Mei' },
];

export const Default: Story = {
  args: {
    id: 'select',
    label: '選択してください',
    options: mockOptions,
  },
};

export const Disabled: Story = {
  args: {
    id: 'select',
    label: '選択してください',
    options: mockOptions,
    isDisabled: true,
  },
};
