import React from "react";
import { buttonStyles } from "../../styles/componentStyles";

type Props = {
  label: string;
  type: "submit" | "reset" | "button";
  style: "primary" | "secondary" | "disabled";
};

export const Button = (props: Props) => {
  const { label, type, style } = props;
  return (
    <div>
      <button className={`${buttonStyles[style]}`} type={type}>
        {label}
      </button>
    </div>
  );
};
