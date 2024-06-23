import React from 'react';
import '@/app/styles/globals.css';
import { buttonStyles } from './index.styles';

export type Props = {
  label: string;
  type: 'submit' | 'reset' | 'button';
  intent: 'primary' | 'secondary' | 'disabled';
  onClick?: () => void;
};

export const Button = (props: Props) => {
  const { label, type, intent, onClick } = props;
  return (
    <div>
      <button
        className={buttonStyles({ intent })}
        type={type}
        disabled={intent === 'disabled' || false}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};
