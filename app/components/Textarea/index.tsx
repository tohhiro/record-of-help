import React from "react";
import { textareaStyles } from "./index.styles";

export type Props = {
  label: string;
  id: string;
  placeholder: string;
};

export const Textarea = (props: Props) => {
  const { label, id, placeholder } = props;
  return (
    <div className={textareaStyles.container}>
      <label htmlFor={id} className={textareaStyles.label}>
        {label}
      </label>
      <textarea
        id={id}
        className={textareaStyles.textarea}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
