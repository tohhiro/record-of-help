import React from "react";
import "../../globals.css";
import { Login } from ".";

export default {
  title: "app/feature/Login",
  component: Login,
};
  
  export const Default: React.FC = (): JSX.Element => {
    return <Login />;
  };
  