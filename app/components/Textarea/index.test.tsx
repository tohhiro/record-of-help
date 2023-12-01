import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
    const labelOfTextareaComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfTextareaComponent).toBeInTheDocument();
    const textareaComponent = screen.queryByPlaceholderText(
      mockValues.placeholder
    );
    expect(textareaComponent).toHaveAttribute(
      "placeholder",
      mockValues.placeholder
    );
  });
  test("textareaに入力ができる",()=>{
    const mockValues: Props = {
    id: "textarea",
    label: "Textarea Label",
    placeholder: "テキストを入力してください",
  };
    render(<Textarea {...mockValues} />);
    const textareaComponent = screen.getByRole("textbox", { name: mockValues.label });
    const typeText = "テスト"
    fireEvent.change(textareaComponent, { target: { value: typeText } });
    expect((textareaComponent as HTMLTextAreaElement).value).toBe(typeText)
  })
});
