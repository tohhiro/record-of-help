import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, Props } from '.';

describe('Input', () => {
  const user = userEvent.setup();

  const mockValues: Props = {
    id: 'input',
    label: 'Input Label',
    type: 'text',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('inputがレンダーされる', () => {
    const { getByRole } = render(<Input {...mockValues} />);
    const inputComponent = getByRole('textbox', {
      name: mockValues.label,
    });
    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeEnabled();
  });

  test('inputに「ほげほげ」と入力ができる', async () => {
    const { getByRole } = render(<Input {...mockValues} />);

    const inputComponent = getByRole('textbox', {
      name: mockValues.label,
    });

    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeEnabled();

    const typeText = 'ほげほげ';
    await user.type(inputComponent, typeText);
    expect(inputComponent).toHaveDisplayValue(typeText);
  });

  test('inputがdisabledで表示', async () => {
    const mockValuesWithDisabledButton: Props = {
      ...mockValues,
      disabled: true,
    };

    const { getByRole } = render(<Input {...mockValuesWithDisabledButton} />);
    const inputComponent = getByRole('textbox', {
      name: mockValuesWithDisabledButton.label,
    });

    expect(inputComponent).toHaveAttribute('type', mockValuesWithDisabledButton.type);
    expect(inputComponent).toBeDisabled();

    const typeText = 'ほげほげ';
    await user.type(inputComponent, typeText);
    expect(inputComponent).toHaveDisplayValue('');
  });

  test('inputをクリックするとonClickが呼ばれる', async () => {
    const { getByRole } = render(<Input {...mockValues} />);
    const inputComponent = getByRole('textbox', {
      name: mockValues.label,
    });

    await user.click(inputComponent);
    expect(mockValues.onClick).toHaveBeenCalled();
  });

  test('disabledの場合、inputをクリックしてもonClickが呼ばれない', async () => {
    const mockValuesWithDisabledButton: Props = {
      ...mockValues,
      disabled: true,
    };

    const { getByRole } = render(<Input {...mockValuesWithDisabledButton} />);
    const inputComponent = getByRole('textbox', {
      name: mockValues.label,
    });

    await user.click(inputComponent);
    expect(mockValues.onClick).not.toHaveBeenCalled();
  });
});
