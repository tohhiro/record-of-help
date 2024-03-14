import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header, headerText, NavType } from '.';
import userEvent from '@testing-library/user-event';

const mockNavItems: NavType = {
  Form: './form',
  Dashboard: './dashboard',
};

describe('Header', () => {
  test('Headerのタイトルがレンダーされる', () => {
    render(<Header links={mockNavItems} onClick={jest.fn()} />);
    const headerComponent = screen.getByText(headerText);
    expect(headerComponent).toBeInTheDocument();
  });

  test.each`
    linkName       | href             | expected
    ${'Form'}      | ${'./form'}      | ${(<a href="./form">Form</a>)}
    ${'Dashboard'} | ${'./dashboard'} | ${(<a href="./dashboard">Dashboard</a>)}
  `('HeaderのnavとなるLinkがそれぞれ対応するhref属性をもつ', ({ linkName, href }) => {
    render(<Header links={mockNavItems} onClick={jest.fn()} />);
    const link = screen.getByRole('link', { name: linkName });
    expect(link).toHaveAttribute('href', href);
  });

  test('Logoutをクリックすると、propsで渡したonClick関数が1回実行される', async () => {
    const mockOnClick = jest.fn();
    render(<Header links={mockNavItems} onClick={mockOnClick} />);
    const logout = screen.getByText('Logout');
    const user = userEvent.setup();
    await user.click(logout);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
