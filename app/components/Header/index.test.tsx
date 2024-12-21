import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header, headerText, NavAdminType } from '.';

const mockNavItems: NavAdminType = {
  Form: './form',
  Dashboard: './dashboard',
};

const mockLoginUser = 'test@test.com';

describe('Header', () => {
  const mockData = {
    links: mockNavItems,
    loginUser: mockLoginUser,
    onClick: jest.fn(),
  };

  afterEach(() => {
    mockData.onClick.mockClear();
  });

  test('Headerのタイトルがレンダーされる', () => {
    const { getByText } = render(<Header {...mockData} />);
    const headerComponent = getByText(headerText);
    expect(headerComponent).toBeInTheDocument();
  });

  test.each`
    linkName       | href             | expected
    ${'Form'}      | ${'./form'}      | ${(<a href="./form">Form</a>)}
    ${'Dashboard'} | ${'./dashboard'} | ${(<a href="./dashboard">Dashboard</a>)}
  `('HeaderのnavとなるLinkがそれぞれ対応するhref属性をもつ', ({ linkName, href }) => {
    const { getByRole } = render(<Header {...mockData} />);

    const link = getByRole('link', { name: linkName });
    expect(link).toHaveAttribute('href', href);
  });

  test('Logoutをクリックすると、propsで渡したonClick関数が1回実行される', async () => {
    const { getByText } = render(<Header {...mockData} />);

    const logout = getByText(mockLoginUser);
    const user = userEvent.setup();
    await user.click(logout);
    expect(mockData.onClick).toHaveBeenCalledTimes(1);
  });
});
