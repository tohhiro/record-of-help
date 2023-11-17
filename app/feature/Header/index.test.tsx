import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header, headerText } from ".";

describe("Header", () => {
  test("Headerがレンダーされる", () => {
    render(<Header />);
    const headerComponent = screen.getByText(headerText);
    expect(headerComponent).toBeInTheDocument();
  });
});
