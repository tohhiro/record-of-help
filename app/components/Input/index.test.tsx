import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input, Props } from '.';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  const mockValues: Props = {
    id: 'input',
    label: 'Input Label',
    type: 'text',
    onClick: () => void 0,
  };
  test('inputがレンダーされる', () => {
    render(<Input {...mockValues} />);
    const inputComponent = screen.getByRole('textbox', {
      name: mockValues.label,
    });
    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeEnabled();
  });
  test('inputに「ほげほげ」と入力ができる', async () => {
    render(<Input {...mockValues} />);
    const inputComponent = screen.getByRole('textbox', {
      name: mockValues.label,
    });
    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeEnabled();

    const typeText = 'ほげほげ';
    const user = userEvent.setup();

    await user.type(inputComponent, typeText);
    expect((inputComponent as HTMLTextAreaElement).value).toBe(typeText);
  });
  test('inputがdisabledで表示', async () => {
    const mockValuesWithDisabledButton: Props = {
      ...mockValues,
      disabled: true,
    };
    render(<Input {...mockValuesWithDisabledButton} />);
    const inputComponent = screen.getByRole('textbox', {
      name: mockValuesWithDisabledButton.label,
    });
    expect(inputComponent).toHaveAttribute('type', mockValuesWithDisabledButton.type);
    expect(inputComponent).toBeDisabled();

    const typeText = 'ほげほげ';
    const user = userEvent.setup();
    await user.type(inputComponent, typeText);
    expect((inputComponent as HTMLTextAreaElement).value).toBe('');
  });
});
