import React from "react";
import "../../styles/globals.css";
import Form from "./page";

export default {
  title: "app/feature/Form",
  component: Form,
};
  
  export const Default: React.FC = (): JSX.Element => {
    return <Form />;
  };
  