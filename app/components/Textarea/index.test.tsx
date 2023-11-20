import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Textarea, Props } from ".";

describe("Textarea", () => {
  test("textareaがレンダーされる", () => {
    const mockValues: Props = {
      id: "textarea",
      label: "Textarea Label",
      placeholder: "テキストを入力してください",
    };
    render(<Textarea {...mockValues} />);
    const labelOftextareaComponent = screen.getByLabelText(mockValues.label);
    expect(labelOftextareaComponent).toBeInTheDocument();
    const textareaComponent = screen.queryByPlaceholderText(
      mockValues.placeholder
    );
    expect(textareaComponent).toHaveAttribute(
      "placeholder",
      mockValues.placeholder
    );
  });
});
