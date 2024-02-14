import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header, headerText, NavType } from '.';

const mockNavItems: NavType = {
  Form: './form',
  Dashboard: './dashboard',
};

describe('Header', () => {
  test('Headerのタイトルがレンダーされる', () => {
    render(<Header links={mockNavItems} />);
    const headerComponent = screen.getByText(headerText);
    expect(headerComponent).toBeInTheDocument();
  });

  test.each`
    linkName       | href             | expected
    ${'Form'}      | ${'./form'}      | ${(<a href="./form">Form</a>)}
    ${'Dashboard'} | ${'./dashboard'} | ${(<a href="./dashboard">Dashboard</a>)}
    ${'Logout'}    | ${'#'}           | ${(<a href="#">Logout</a>)}
  `('HeaderのnavとなるLinkがそれぞれ対応するhref属性をもつ', ({ linkName, href }) => {
    render(<Header links={mockNavItems} />);
    const link = screen.getByRole('link', { name: linkName });
    expect(link).toHaveAttribute('href', href);
  });
});
