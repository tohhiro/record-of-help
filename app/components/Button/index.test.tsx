import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, Props } from '.';

describe('Button', () => {
  const mockValues: Props = {
    label: 'ボタン',
    type: 'button',
    intent: 'primary',
    onClick: jest.fn(),
  };
  test('Buttonコンポーネントがレンダリングされる', () => {
    render(<Button {...mockValues} />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toHaveTextContent(mockValues.label);
  });
  test('Buttonコンポーネントがdisabledでレンダリングされる', () => {
    const mockValuesWithDisabledButton: Props = {
      ...mockValues,
      intent: 'disabled',
    };
    render(<Button {...mockValuesWithDisabledButton} />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeDisabled();
  });
  test('Buttonコンポーネントのtype属性がsubmitでレンダリングされる', () => {
    const mockValuesWithAttrSubmit: Props = {
      ...mockValues,
      intent: 'primary',
    };
    render(<Button {...mockValuesWithAttrSubmit} />);
    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toHaveAttribute('type', mockValues.type);
  });
});
