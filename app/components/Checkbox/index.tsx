'use client';
import React, { Ref } from 'react';
import '@/app/styles/globals.css';
import { checkboxStyles } from './index.styles';

export type Props = {
  id: string;
  label: string;
  value: string;
  ref: Ref<HTMLInputElement>;
};

export const Checkbox = ({ id, label, value, ref, ...rest }: Props) => {
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
};
