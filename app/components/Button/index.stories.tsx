import React from 'react';
import { Button, Props } from '.';

export default {
  title: 'app/components/Button',
  component: Button,
};

const mockData = (opt: { disabled: boolean }): Props => {
  return {
    label: 'Buttonラベル',
    type: 'button',
    style: 'primary',
    onClick: () => {},
    disabled: opt.disabled,
  };
};

export const Default = (): JSX.Element => {
  return <Button {...mockData({ disabled: false })} />;
};

export const Disabled = (): JSX.Element => {
  return <Button {...mockData({ disabled: true })} />;
};
