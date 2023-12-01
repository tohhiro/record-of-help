import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Checkbox, Props } from ".";

describe("Checkbox", () => {
  test("Checkboxがレンダーされる", () => {
    const mockValues: Props = {
      label: "Checkbox Label",
      id: "checkbox1",
      value: "checkboxValue",
      ref: null,
    };
    render(<Checkbox {...mockValues} />);
    const labelOfCheckboxComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfCheckboxComponent).toBeInTheDocument();
    const inputOfCheckboxComponent = screen.getByRole("checkbox");
    expect(inputOfCheckboxComponent).toHaveAttribute("type", "checkbox");
  });
});
