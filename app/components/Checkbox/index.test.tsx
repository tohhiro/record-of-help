import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, Props } from '.';

describe('Checkbox', () => {
  const mockValues: Props = {
    label: 'Checkbox Label',
    id: 'checkbox1',
    value: 'checkboxValue',
    ref: null,
  };

  test('Checkboxがレンダーされる', () => {
    render(<Checkbox {...mockValues} />);

    const labelOfCheckboxComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfCheckboxComponent).toBeInTheDocument();

    const inputOfCheckboxComponent = screen.getByRole('checkbox');
    expect(inputOfCheckboxComponent).toHaveAttribute('type', 'checkbox');
  });

  test('Checkboxがチェックできる', async () => {
    render(<Checkbox {...mockValues} />);
    const checkboxComponent = screen.getByRole('checkbox', {
      name: mockValues.label,
    });

    expect(checkboxComponent).toBeEnabled();
    expect(checkboxComponent.getAttribute('checked')).toBeNull();

    const user = userEvent.setup();
    await user.click(checkboxComponent);
    expect(checkboxComponent.getAttribute('checked'));
  });
});
