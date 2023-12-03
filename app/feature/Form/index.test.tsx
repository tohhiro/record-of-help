import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Form, Props, helps } from ".";

describe("Form", () => {
    describe("radio",()=>{
        test("radioボタンが2つレンダリングされる", () => {
            render(<Form />);
            const radioButtons = screen.getAllByRole("radio");
            expect(radioButtons).toHaveLength(2);
        });
        test("radioボタンのvalue属性が正しく設定されている", () => {
            render(<Form />);
            const radioButtonValues = ["eito", "mei"];
            radioButtonValues.forEach((value) => {
                const radioButton = screen.getByRole("radio", { name: value });
                expect(radioButton).toHaveAttribute("value", value);
            })
       });
       test("radioボタンのチェックを入れると、チェックされたradioボタンの属性がcheckedになっている", async () => {
            render(<Form />);
            const user = userEvent.setup()
            const radioButtonValues = ["eito", "mei"];
            radioButtonValues.forEach(async (value) => {
                const radioButton = screen.getByRole("radio", { name: value });
                userEvent.click(radioButton)
                await waitFor(() => expect(radioButton).toHaveAttribute("checked", true));
            })
        });
    })
    describe("checkbox",()=>{
        test("checkboxが5個レンダリングされる", () => {
            render(<Form />);
            const checkboxes = screen.getAllByRole("checkbox");
            expect(checkboxes).toHaveLength(helps.length);
        });
        test("checkboxのvalue属性が正しく設定されている", () => {
            render(<Form />);
            helps.forEach((help) => {
                const checkbox = screen.getByRole("checkbox", { name: help.label });
                expect(checkbox).toHaveAttribute("value", help.id);
            })
        });
        test("checkboxのチェックを入れると、チェックされたcheckboxの属性がcheckedになっている", async () => {
            render(<Form />);
            const user = userEvent.setup()
            helps.forEach(async (help) => {
                const checkbox = screen.getByRole("checkbox", { name: help.label });
                userEvent.click(checkbox)
                await waitFor(() => expect(checkbox).toHaveAttribute("checked", true));
            })
        });
    })
    describe("textarea",()=>{
        test("textareaが1つレンダーされる", () => {
            render(<Form />);
            const textarea = screen.getAllByRole("textbox");
            expect(textarea).toHaveLength(1);
        });
        test("textareaに入力ができる", () => {
            render(<Form />);
            const textarea = screen.getByRole("textbox");
            const typeText = "テスト"
            fireEvent.change(textarea, { target: { value: typeText } });
            expect((textarea as HTMLTextAreaElement).value).toBe(typeText)
        });
    })
});