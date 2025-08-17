import '@/app/styles/globals.css';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import { checkboxStyles } from './index.styles';

export type Props = { id: string; label: string; value: string };

export const Checkbox = forwardRef(
  ({ id, label, value, ...rest }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <div className={checkboxStyles.container}>
        <input
          {...rest}
          type="checkbox"
          id={id}
          className={checkboxStyles.checkbox}
          value={value}
          ref={ref}
        />
        <label htmlFor={id} className={checkboxStyles.label}>
          {label}
        </label>
      </div>
    );
  },
);
