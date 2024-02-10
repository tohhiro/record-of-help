'use client';
import React, { forwardRef, Ref } from 'react';
import '../../styles/globals.css';
import { checkboxStyles } from './index.styles';

export type Props = {
  id: string;
  label: string;
  value: string;
  ref: Ref<HTMLInputElement>;
};

export const Checkbox = forwardRef((props: Props, ref) => {
  const { id, label, value, ...rest } = props;
  return (
    <div className={checkboxStyles.container}>
      <input
        type="checkbox"
        id={id}
        className={checkboxStyles.checkbox}
        value={value}
        {...rest}
        ref={ref as Ref<HTMLInputElement>}
      />
      <label htmlFor={id} className={checkboxStyles.label}>
        {label}
      </label>
    </div>
  );
});
