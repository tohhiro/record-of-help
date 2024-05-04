import React from 'react';
import { Button, Props } from '.';

export default {
  title: 'app/components/Button',
  component: Button,
};

const mockData: Props = {
  label: 'Buttonラベル',
  type: 'button',
  style: 'primary',
  onClick: () => {},
  disabled: false,
};

export const Default = (): JSX.Element => {
  return <Button {...mockData} />;
};

export const Disabled = (): JSX.Element => {
  return <Button {...mockData} disabled={true} />;
};

export const Secondary = (): JSX.Element => {
  return <Button {...mockData} style="secondary" />;
};
