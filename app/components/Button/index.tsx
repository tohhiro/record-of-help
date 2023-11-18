import React from "react";
import "../../globals.css";
import { buttonStyles } from "./index.styles";

export type Props = {
  label: string;
  type: "submit" | "reset" | "button";
  style: "primary" | "secondary" | "disabled";
  onClick: () => void;
  disabled?: boolean;
};

export const Button = (props: Props) => {
  const { label, type, style, disabled, onClick } = props;
  return (
    <div>
      <button
        className={`${buttonStyles[style]}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};
