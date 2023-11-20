import React from "react";
import "../../globals.css";
import { Textarea, Props } from ".";

export default {
  title: "app/components/Textarea",
  component: Textarea,
};

const mockData: Props = {
  id: "textarea",
  label: "Textareaラベル",
  placeholder: "Textareaプレースホルダー",
};

export const Default: React.FC = (): JSX.Element => {
  return <Textarea {...mockData} />;
};
