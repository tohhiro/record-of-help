import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, Props } from '.';

describe('Button', () => {
  test('Buttonコンポーネントがレンダリングされる', () => {
    const onClick = jest.fn();
    const mockValues: Props = {
      label: 'ボタン',
      type: 'button',
      style: 'primary',
      onClick,
    };
    render(<Button {...mockValues} />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toHaveTextContent(mockValues.label);
  });
  test('Buttonコンポーネントがdisabledでレンダリングされる', () => {
    const onClick = jest.fn();
    const mockValues: Props = {
      label: 'ボタン',
      type: 'button',
      style: 'primary',
      disabled: true,
      onClick,
    };
    render(<Button {...mockValues} />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeDisabled();
  });
  test('Buttonコンポーネントのtype属性がsubmitでレンダリングされる', () => {
    const onClick = jest.fn();
    const mockValues: Props = {
      label: 'ボタン',
      type: 'submit',
      style: 'primary',
      onClick,
    };
    render(<Button {...mockValues} />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toHaveAttribute('type', mockValues.type);
  });
});
