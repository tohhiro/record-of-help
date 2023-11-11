import React from "react";
//import { buttonStyles } from "@/app/styles/componentStyles";

type Props = {
  label: string;
};

export const Checkbox = (props: Props) => {
  const { label } = props;
  return (
    <div>
      <label>{label}</label>
      <input type="Checkbox" />
    </div>
  );
};
