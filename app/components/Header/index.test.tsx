import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header, headerText, NavType } from '.';

const mockNavItems: NavType = {
  Form: './form',
  Dashboard: './dashboard',
};

describe('Header', () => {
  test('Headerがレンダーされる', () => {
    render(<Header links={mockNavItems} />);
    const headerComponent = screen.getByText(headerText);
    expect(headerComponent).toBeInTheDocument();
  });
});
