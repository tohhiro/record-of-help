import React from "react";

type Props = {
  label: string;
  type: "submit" | "reset" | "button";
  color: "500" | "300";
};

export const Button = (props: Props) => {
  const { label, type, color } = props;
  return (
    <div className="bg-indigo-500">
      <button className="bg-indigo-500 text-green-500" type={type}>
        {label}
      </button>
    </div>
  );
};
