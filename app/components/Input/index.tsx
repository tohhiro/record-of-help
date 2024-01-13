import React, { forwardRef } from 'react';
import '../../styles/globals.css';
import { inputStyles } from './index.styles';

type DefaultProps = {
  id: string;
  label: string;
  type: 'text' | 'password' | 'date';
  onClick?: () => void;
  disabled?: boolean;
};

type HiddenProps = {
  id: string;
  label: never;
  type: 'hidden';
  onClick?: () => void;
  disabled: never;
};

export type Props = DefaultProps | HiddenProps;

export const Input = forwardRef((props: Props, _ref) => {
  const { id, label, type, onClick, disabled, ...field } = props;
  return (
    <div>
      <label htmlFor={id} className={inputStyles.label}>
        {label}
      </label>
      <input
        id={id}
        className={`${inputStyles[disabled ? 'disabled' : 'input']}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
        {...field}
      />
    </div>
  );
});
