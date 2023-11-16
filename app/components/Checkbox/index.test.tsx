import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Checkbox, Props } from ".";

describe("Checkbox", () => {
  test("Checkboxがレンダーされる", () => {
    const mockValues: Props = {
      label: "Checkbox Label",
      id: "checkbox1",
    };
    render(<Checkbox {...mockValues} />);
    const labelOfcheckboxComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfcheckboxComponent).toBeInTheDocument();
    const inputOfcheckboxComponent = screen.getByRole("checkbox");
    expect(inputOfcheckboxComponent).toHaveAttribute("type", "checkbox");
  });
});
