import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Radio, Props } from ".";

describe("Radio", () => {
  test("Radioボタンがレンダーされる", () => {
    const mockValues: Props = {
      id: "radio1",
      label: "Radio Label",
      value: "radioValue",
    };
    render(<Radio {...mockValues} />);
    const labelOfCheckboxComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfCheckboxComponent).toBeInTheDocument();
    const inputOfCheckboxComponent = screen.getByRole("radio");
    expect(inputOfCheckboxComponent).toHaveAttribute("type", "radio");
  });
});
