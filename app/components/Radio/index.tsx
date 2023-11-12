import React from "react";
import { radioStyles } from "../../styles/componentStyles";

type Props = {
  id: string;
  label: string;
  name: string;
};

export const Radio = (props: Props) => {
  const { id, label, name } = props;
  return (
    <div className={radioStyles.container}>
      <input type="radio" id={id} name={name} className={radioStyles.radio} />
      <label htmlFor={id} className={radioStyles.label}>
        {label}
      </label>
    </div>
  );
};
