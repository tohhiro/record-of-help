import React from "react";
import { Button, Props } from ".";

export default {
  title: "app/components/Button",
  component: Button,
};

export const Default: React.FC = (): JSX.Element => {
  const mockData: Props = {
    label: "Buttonラベル",
    type: "button",
    style: "primary",
    onClick: () => {},
    disabled: false,
  };

  return <Button {...mockData} />;
};
