'use client';
import React, { forwardRef, Ref } from 'react';
import '@/app/styles/globals.css';
import { checkboxStyles } from './index.styles';

export type Props = {
  id: string;
  label: string;
  value: string;
  ref: Ref<HTMLInputElement>;
};

export const Checkbox = forwardRef(({ id, label, value, ...rest }: Props, ref) => {
  return (
    <div className={checkboxStyles.container}>
      <input
        {...rest}
        type="checkbox"
        id={id}
        className={checkboxStyles.checkbox}
        value={value}
        ref={ref as Ref<HTMLInputElement>}
      />
      <label htmlFor={id} className={checkboxStyles.label}>
        {label}
      </label>
    </div>
  );
});
