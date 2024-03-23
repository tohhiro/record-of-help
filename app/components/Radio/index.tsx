import React, { forwardRef } from 'react';
import '@/app/styles/globals.css';
import { radioStyles } from './index.styles';

export type Props = {
  id: string;
  label: string;
  value: string;
};

export const Radio = forwardRef((props: Props, _ref) => {
  const { id, label, value, ...field } = props;
  return (
    <div className={radioStyles.container}>
      <input type="radio" id={id} className={radioStyles.radio} {...field} value={value} />
      <label htmlFor={id} className={radioStyles.label}>
        {label}
      </label>
    </div>
  );
});
