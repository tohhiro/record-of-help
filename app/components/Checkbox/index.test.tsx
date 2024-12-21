import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox, Props } from '.';

describe('Checkbox', () => {
  const mockValues: Props = {
    label: 'Checkbox Label',
    id: 'checkbox1',
    value: 'checkboxValue',
  };

  test('Checkboxがレンダーされる', () => {
    const { getByLabelText, getByRole } = render(<Checkbox {...mockValues} />);

    const labelOfCheckboxComponent = getByLabelText(mockValues.label);
    expect(labelOfCheckboxComponent).toBeInTheDocument();

    const inputOfCheckboxComponent = getByRole('checkbox');
    expect(inputOfCheckboxComponent).toHaveAttribute('type', 'checkbox');
  });

  test('Checkboxがチェックできる', async () => {
    const { getByRole } = render(<Checkbox {...mockValues} />);
    const checkboxComponent = getByRole('checkbox', {
      name: mockValues.label,
    });

    expect(checkboxComponent).toBeEnabled();
    expect(checkboxComponent.getAttribute('checked')).toBeNull();

    const user = userEvent.setup();
    await user.click(checkboxComponent);
    expect(checkboxComponent.getAttribute('checked'));
  });
});
