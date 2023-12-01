import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Radio, Props } from ".";
import userEvent from "@testing-library/user-event";

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
  test("Radioボタンがクリックできる", () => {
    const mockValues: Props = {
      id: "radio1",
      label: "Radio Label",
      value: "radioValue",
    };
    render(<Radio {...mockValues} />);
    const checkboxComponent = screen.getByRole('radio',{name: mockValues.label});
    expect(checkboxComponent).toBeEnabled()
    expect(checkboxComponent.getAttribute('checked')).toBeNull(); 

    const user = userEvent.setup()
    user.click(checkboxComponent)
    expect(checkboxComponent.getAttribute('checked')); 
    
  });
});
