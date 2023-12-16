import React from "react";
import "../../styles/globals.css";
import { Header } from ".";

export default {
  title: "app/components/Header",
  component: Header,
};

export const Default: React.FC = (): JSX.Element => {
  return <Header />;
};
