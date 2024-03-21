import React, { forwardRef } from 'react';
import '../../styles/globals.css';
import { textareaStyles } from './index.styles';

export type Props = {
  label: string;
  id: string;
  placeholder: string;
};

export const Textarea = forwardRef((props: Props, _ref) => {
  const { label, id, placeholder, ...field } = props;
  return (
    <div>
      <label htmlFor={id} className={textareaStyles.label}>
        {label}
      </label>
      <textarea id={id} className={textareaStyles.textarea} placeholder={placeholder} {...field} />
    </div>
  );
});
