import React from "react";
import { checkboxStyles } from "./index.styles";

type Props = {
  id: string;
  label: string;
};

export const Checkbox = (props: Props) => {
  const { id, label } = props;
  return (
    <div className={checkboxStyles.container}>
      <input type="Checkbox" id={id} className={checkboxStyles.checkbox} />
      <label htmlFor={id} className={checkboxStyles.label}>
        {label}
      </label>
    </div>
  );
};
