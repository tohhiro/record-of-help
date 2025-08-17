import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header, headerText, type NavAdminType } from '.';

const mockNavItems: NavAdminType = { Form: './form', Dashboard: './dashboard' };

const mockLoginUser = 'test@test.com';

describe('Header', () => {
  const mockData = { links: mockNavItems, loginUser: mockLoginUser, onClick: jest.fn() };

  afterEach(() => {
    mockData.onClick.mockClear();
  });

  test('Headerのタイトルがレンダーされる', () => {
    render(<Header {...mockData} />);
    const headerComponent = screen.getByText(headerText);
    expect(headerComponent).toBeInTheDocument();
  });

  test.each`
    linkName       | href             | expected
    ${'Form'}      | ${'./form'}      | ${(<a href="./form">Form</a>)}
    ${'Dashboard'} | ${'./dashboard'} | ${(<a href="./dashboard">Dashboard</a>)}
  `('HeaderのnavとなるLinkがそれぞれ対応するhref属性をもつ', ({ linkName, href }) => {
    render(<Header {...mockData} />);

    const link = screen.getByRole('link', { name: linkName });
    expect(link).toHaveAttribute('href', href);
  });

  test('Logoutをクリックすると、propsで渡したonClick関数が1回実行される', async () => {
    render(<Header {...mockData} />);

    const logout = screen.getByText(mockLoginUser);
    const user = userEvent.setup();
    await user.click(logout);
    expect(mockData.onClick).toHaveBeenCalledTimes(1);
  });
});
