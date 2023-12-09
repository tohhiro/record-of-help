import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Login } from ".";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
    test("Loginのコンポーネントが有効な状態でレンダーされる", () => {
        render(<Login />);
        const emailInputComponent = screen.getByRole("textbox", { name: "メールアドレス" });
        const passwordInputComponent = screen.getByLabelText("パスワード" );
        const loginButtonComponent = screen.getByRole("button");

        const loginComponents = [
            {
                type: "text",
                component: emailInputComponent
            }, 
            {
                type: "password",
                component: passwordInputComponent
            }, 
            {
                type: "submit",
                component: loginButtonComponent
            }
        ]
        loginComponents.forEach((item) => {
            expect(item.component).toHaveAttribute('type', item.type)
            expect(item.component).toBeEnabled();
        })
    });
    test('emailとpasswordが入力できる',()=>{
        render(<Login />);
        const emailInputComponent = screen.getByRole("textbox", { name: "メールアドレス" });
        const passwordInputComponent = screen.getByLabelText("パスワード" );

        const email = "email@test.com"
        const password = "password"
        fireEvent.change(emailInputComponent, {target: {value: email}})
        fireEvent.change(passwordInputComponent, {target: {value: password}})

        expect((emailInputComponent as HTMLTextAreaElement).value).toBe(email)
        expect((passwordInputComponent as HTMLTextAreaElement).value).toBe(password)
    })
    test('emailとpasswordが入力し、SubmitするとSubmitボタンがdisabledになる',async ()=>{
        render(<Login />);
        const emailInputComponent = screen.getByRole("textbox", { name: "メールアドレス" });
        const passwordInputComponent = screen.getByLabelText("パスワード" );
        const loginButtonComponent = screen.getByRole("button");

        const email = "email@test.com"
        const password = "password"
        fireEvent.change(emailInputComponent, {target: {value: email}})
        fireEvent.change(passwordInputComponent, {target: {value: password}})

        expect((emailInputComponent as HTMLTextAreaElement).value).toBe(email)
        expect((passwordInputComponent as HTMLTextAreaElement).value).toBe(password)
        expect(loginButtonComponent).toBeEnabled()
        
        const user = userEvent.setup()
        user.click(loginButtonComponent)

        await waitFor(() => expect(loginButtonComponent).toBeDisabled());
    })
})