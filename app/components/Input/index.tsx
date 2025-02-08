import '@/app/styles/globals.css';
import { forwardRef } from 'react';
import { inputStyles, labelStyles } from './index.styles';

type CommonProps = {
  id: string;
  placeholder?: string;
  onClick?: () => void;
};

type DefaultProps = {
  label: string;
  type: 'text' | 'password' | 'date';
  disabled?: boolean;
} & CommonProps;

type HiddenProps = {
  label: never;
  type: 'hidden';
  disabled: never;
} & CommonProps;

export type Props = DefaultProps | HiddenProps;

export const Input = forwardRef(
  ({ id, label, type, onClick, placeholder, disabled, ...field }: Props, _ref) => {
    return (
      <div>
        <label htmlFor={id} className={labelStyles.label}>
          {label}
        </label>
        <input
          {...field}
          id={id}
          placeholder={placeholder}
          onClick={onClick}
          className={inputStyles({ intent: disabled ? 'disabled' : 'primary' })}
          type={type}
          disabled={disabled}
        />
      </div>
    );
  },
);
