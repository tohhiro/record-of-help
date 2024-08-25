import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { default as Login } from './page';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { useSignIn } from './hooks/useSignIn';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('./hooks/useSignIn');

const mockedUseSingIn = jest.mocked(useSignIn);

describe('Login', () => {
  beforeEach(() => {
    mockedUseSingIn.mockReturnValue({
      signIn: jest.fn().mockResolvedValueOnce({
        data: null,
        error: null,
      }),
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('Loginのコンポーネントが有効な状態でレンダーされる', () => {
    render(<Login />);

    const emailInputComponent = screen.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = screen.getByLabelText('パスワード');
    const loginButtonComponent = screen.getByRole('button');

    const loginComponents = [
      {
        type: 'text',
        component: emailInputComponent,
      },
      {
        type: 'password',
        component: passwordInputComponent,
      },
      {
        type: 'submit',
        component: loginButtonComponent,
      },
    ];
    loginComponents.forEach((item) => {
      expect(item.component).toHaveAttribute('type', item.type);
      expect(item.component).toBeEnabled();
    });
  });
  test('emailとpasswordが入力できる', async () => {
    render(<Login />);

    const emailInputComponent = screen.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = screen.getByLabelText('パスワード');

    const email = 'email@test.com';
    const password = 'password';
    const user = userEvent.setup();

    await user.type(emailInputComponent, email);
    expect((emailInputComponent as HTMLTextAreaElement).value).toBe(email);

    await user.type(passwordInputComponent, password);
    expect((passwordInputComponent as HTMLTextAreaElement).value).toBe(password);
  });

  test('emailとpasswordが入力し、SubmitするとSubmitボタンがdisabledになる', async () => {
    mockRouter.replace('/from');
    render(<Login />);

    const emailInputComponent = screen.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = screen.getByLabelText('パスワード');
    const loginButtonComponent = screen.getByRole('button');

    expect(loginButtonComponent).toBeEnabled();

    const email = 'email@test.com';
    const password = 'password';
    const user = userEvent.setup();

    await user.type(emailInputComponent, email);
    expect((emailInputComponent as HTMLTextAreaElement).value).toBe(email);

    await user.type(passwordInputComponent, password);
    expect((passwordInputComponent as HTMLTextAreaElement).value).toBe(password);

    await user.click(loginButtonComponent);
    expect(loginButtonComponent).toBeDisabled();
  });
});
