import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSignIn } from './hooks/useSignIn';
import { default as Login } from './page';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('./hooks/useSignIn');

const mockedUseSingIn = jest.mocked(useSignIn);

describe('Login', () => {
  const user = userEvent.setup();

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

    await user.type(emailInputComponent, email);
    expect(emailInputComponent).toHaveDisplayValue(email);

    await user.type(passwordInputComponent, password);
    expect(passwordInputComponent).toHaveDisplayValue(password);
  });

  test('emailとpasswordが入力し、SubmitするとSubmitボタンがdisabledになる', async () => {
    mockedUseSingIn.mockReturnValue({
      signIn: jest.fn().mockResolvedValueOnce({
        data: null,
        error: null,
      }),
    });

    render(<Login />);

    const emailInputComponent = screen.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = screen.getByLabelText('パスワード');
    const loginButtonComponent = screen.getByRole('button');

    expect(loginButtonComponent).toBeEnabled();

    const email = 'email@test.com';
    const password = 'password';

    await user.type(emailInputComponent, email);
    expect(emailInputComponent).toHaveDisplayValue(email);

    await user.type(passwordInputComponent, password);
    expect(passwordInputComponent).toHaveDisplayValue(password);

    await user.click(loginButtonComponent);
    expect(loginButtonComponent).toBeDisabled();

    mockedUseSingIn.mockReset();
  });
});
