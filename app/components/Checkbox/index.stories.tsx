import React from "react";
import { Checkbox, Props } from ".";

export default {
  title: "app/components/Checkbox",
  component: Checkbox,
};

export const Default: React.FC = (): JSX.Element => {
  const mockData: Props = {
    id: "checkbox",
    label: "Checkboxラベル",
    value: "checkbox value",
    ref: null
  };

  return <Checkbox {...mockData} />;
};
