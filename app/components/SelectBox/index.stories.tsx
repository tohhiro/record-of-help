import React from 'react';
import { SelectBox, Props } from '.';

export default {
  title: 'app/components/SelectBox',
  component: SelectBox,
};

const mockOptions: Props[] = [
  { value: 'all', label: 'All' },
  { value: 'eito', label: 'Eito' },
  { value: 'mei', label: 'Mei' },
];

export const Default = () => {
  return <SelectBox id="select" label="選択してください" options={mockOptions} />;
};

export const Disabled = () => {
  return <SelectBox id="select" label="選択してください" options={mockOptions} isDisabled={true} />;
};
