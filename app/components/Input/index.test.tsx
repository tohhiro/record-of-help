import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, type Props } from '.';

const setup = (jsx: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('Input', () => {
  const mockValues: Props = { id: 'input', label: 'Input Label', type: 'text', onClick: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('inputがレンダーされる', () => {
    setup(<Input {...mockValues} />);
    const inputComponent = screen.getByRole('textbox', { name: mockValues.label });
    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeEnabled();
  });

  test('inputに「ほげほげ」と入力ができる', async () => {
    const { user } = setup(<Input {...mockValues} />);

    const inputComponent = screen.getByRole('textbox', { name: mockValues.label });

    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeEnabled();

    const typeText = 'ほげほげ';
    await user.type(inputComponent, typeText);
    expect(inputComponent).toHaveDisplayValue(typeText);
  });

  test('inputがdisabledで表示', async () => {
    const mockValuesWithDisabledButton: Props = { ...mockValues, disabled: true };

    const { user } = setup(<Input {...mockValuesWithDisabledButton} />);
    const inputComponent = screen.getByRole('textbox', {
      name: mockValuesWithDisabledButton.label,
    });

    expect(inputComponent).toHaveAttribute('type', mockValuesWithDisabledButton.type);
    expect(inputComponent).toBeDisabled();

    const typeText = 'ほげほげ';
    await user.type(inputComponent, typeText);
    expect(inputComponent).toHaveDisplayValue('');
  });

  test('inputをクリックするとonClickが呼ばれる', async () => {
    const { user } = setup(<Input {...mockValues} />);
    const inputComponent = screen.getByRole('textbox', { name: mockValues.label });

    await user.click(inputComponent);
    expect(mockValues.onClick).toHaveBeenCalled();
  });

  test('disabledの場合、inputをクリックしてもonClickが呼ばれない', async () => {
    const mockValuesWithDisabledButton: Props = { ...mockValues, disabled: true };

    const { user } = setup(<Input {...mockValuesWithDisabledButton} />);
    const inputComponent = screen.getByRole('textbox', { name: mockValues.label });

    await user.click(inputComponent);
    expect(mockValues.onClick).not.toHaveBeenCalled();
  });
});
