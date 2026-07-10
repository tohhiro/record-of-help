import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '.';

const setup = (jsx: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('Checkbox', () => {
  const mockValues = { label: 'Checkbox Label', id: 'checkbox1', value: 'checkboxValue' };

  test('Checkboxがレンダーされる', () => {
    setup(<Checkbox {...mockValues} />);

    const labelOfCheckboxComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfCheckboxComponent).toBeInTheDocument();

    const inputOfCheckboxComponent = screen.getByRole('checkbox');
    expect(inputOfCheckboxComponent).toHaveAttribute('type', 'checkbox');
  });

  test('Checkboxがチェックできる', async () => {
    const { user } = setup(<Checkbox {...mockValues} />);
    const checkboxComponent = screen.getByRole('checkbox', { name: mockValues.label });

    expect(checkboxComponent).toBeEnabled();
    expect(checkboxComponent).not.toBeChecked();

    await user.click(checkboxComponent);
    expect(checkboxComponent).toBeChecked();
  });
});
