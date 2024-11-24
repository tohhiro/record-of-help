import '@/app/styles/globals.css';
import { forwardRef } from 'react';
import { radioStyles } from './index.styles';

export type Props = {
  id: string;
  label: string;
  value: string;
};

export const Radio = forwardRef(({ id, label, value, ...field }: Props, _ref) => {
  return (
    <div className={radioStyles.container}>
      <input {...field} type="radio" id={id} className={radioStyles.radio} value={value} />
      <label htmlFor={id} className={radioStyles.label}>
        {label}
      </label>
    </div>
  );
});
