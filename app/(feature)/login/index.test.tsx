import { render } from '@testing-library/react';
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
    const { getByRole, getByLabelText } = render(<Login />);

    const emailInputComponent = getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = getByLabelText('パスワード');
    const loginButtonComponent = getByRole('button');

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
    const { getByRole, getByLabelText } = render(<Login />);

    const emailInputComponent = getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = getByLabelText('パスワード');

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

    const { getByRole, getByLabelText } = render(<Login />);

    const emailInputComponent = getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = getByLabelText('パスワード');
    const loginButtonComponent = getByRole('button');

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
