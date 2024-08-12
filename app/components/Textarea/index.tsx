import React, { forwardRef } from 'react';
import '@/app/styles/globals.css';
import { textareaStyles } from './index.styles';

export type Props = {
  label: string;
  id: string;
  placeholder: string;
};

export const Textarea = forwardRef(({ label, id, placeholder, ...field }: Props, _ref) => {
  return (
    <div>
      <label htmlFor={id} className={textareaStyles.label}>
        {label}
      </label>
      <textarea {...field} id={id} className={textareaStyles.textarea} placeholder={placeholder} />
    </div>
  );
});
