import React from 'react';
import { Input, Props } from '.';

export default {
  title: 'app/components/Input',
  component: Input,
};

const baseMockData: Props = {
  id: 'input',
  label: 'Inputラベル',
  type: 'text',
  onClick: () => {},
};

export const Default: React.FC = (): JSX.Element => {
  const mockData: Props = { ...baseMockData, disabled: false };
  return <Input {...mockData} />;
};

export const Password: React.FC = (): JSX.Element => {
  const mockData: Props = {
    ...baseMockData,
    type: 'password',
    disabled: false,
  };
  return <Input {...mockData} />;
};

export const Disabled: React.FC = (): JSX.Element => {
  const mockData: Props = { ...baseMockData, disabled: true };
  return <Input {...mockData} />;
};
