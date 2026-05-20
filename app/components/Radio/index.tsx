import '@/app/styles/globals.css';
import { forwardRef } from 'react';
import { radioStyles } from './index.styles';

export type Props = {
  id: string;
  label: string;
  value: string;
  name?: string;
};

export const Radio = forwardRef<HTMLInputElement, Props>(
  ({ id, label, value, ...field }: Props, ref) => {
    return (
      <div className={radioStyles.container}>
        <input
          {...field}
          ref={ref}
          type="radio"
          id={id}
          className={radioStyles.radio}
          value={value}
        />
        <label htmlFor={id} className={radioStyles.label}>
          {label}
        </label>
      </div>
    );
  },
);

Radio.displayName = 'Radio';
