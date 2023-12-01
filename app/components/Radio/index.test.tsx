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
    const labelOfRadio = screen.getByLabelText(mockValues.label);
    expect(labelOfRadio).toBeInTheDocument();
    const inputOfRadioComponent = screen.getByRole("radio");
    expect(inputOfRadioComponent).toHaveAttribute("type", "radio");
  });
  test("Radioボタンがクリックできる", () => {
    const mockValues: Props = {
      id: "radio1",
      label: "Radio Label",
      value: "radioValue",
    };
    render(<Radio {...mockValues} />);
    const radioComponent = screen.getByRole('radio',{name: mockValues.label});
    expect(radioComponent).toBeEnabled()
    expect(radioComponent.getAttribute('checked')).toBeNull(); 

    const user = userEvent.setup()
    user.click(radioComponent)
    expect(radioComponent.getAttribute('checked')); 
  });
});
