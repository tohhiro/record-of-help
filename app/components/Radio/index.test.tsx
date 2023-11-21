import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Radio, Props } from ".";

describe("Radio", () => {
  test("Radioボタンがレンダーされる", () => {
    const mockValues: Props = {
      id: "radio1",
      label: "Radio Label",
      name: "radioName",
      value: "radioValue",
    };
    render(<Radio {...mockValues} />);
    const labelOfcheckboxComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfcheckboxComponent).toBeInTheDocument();
    const inputOfcheckboxComponent = screen.getByRole("radio");
    expect(inputOfcheckboxComponent).toHaveAttribute("type", "radio");
  });
});
