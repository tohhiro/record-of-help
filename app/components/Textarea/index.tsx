import '@/app/styles/globals.css';
import { forwardRef } from 'react';
import { textareaStyles } from './index.styles';

export type Props = {
  label: string;
  id: string;
  placeholder?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, id, placeholder, ...field }: Props, ref) => {
    return (
      <div>
        <label htmlFor={id} className={textareaStyles.label}>
          {label}
        </label>
        <textarea
          {...field}
          ref={ref}
          id={id}
          className={textareaStyles.textarea}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
