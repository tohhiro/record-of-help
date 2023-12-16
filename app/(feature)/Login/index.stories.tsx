import React from "react";
import "../../styles/globals.css";
import Login from "./page";

export default {
  title: "app/feature/Login",
  component: Login,
};
  
  export const Default: React.FC = (): JSX.Element => {
    return <Login />;
  };
  