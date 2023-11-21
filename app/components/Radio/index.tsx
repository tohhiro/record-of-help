import React from "react";
import { radioStyles } from "./index.styles";

export type Props = {
  id: string;
  label: string;
  name: string;
  value: string;
};

export const Radio = (props: Props) => {
  const { id, label, name, value } = props;
  return (
    <div className={radioStyles.container}>
      <input
        type="radio"
        id={id}
        name={name}
        className={radioStyles.radio}
        value={value}
      />
      <label htmlFor={id} className={radioStyles.label}>
        {label}
      </label>
    </div>
  );
};
