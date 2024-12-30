import '@/app/styles/globals.css';
import { forwardRef } from 'react';
import { inputStyles, labelStyles } from './index.styles';

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

export const Input = forwardRef(({ id, label, type, onClick, disabled, ...field }: Props, _ref) => {
  return (
    <div>
      <label htmlFor={id} className={labelStyles.label}>
        {label}
      </label>
      <input
        {...field}
        id={id}
        className={inputStyles({ intent: disabled ? 'disabled' : 'primary' })}
        type={type}
        disabled={disabled}
        onClick={onClick}
      />
    </div>
  );
});
