import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Props, Radio } from '.';

describe('Radio', () => {
  const mockValues: Props = {
    id: 'radio1',
    label: 'Radio Label',
    value: 'radioValue',
  };

  test('Radioボタンがレンダーされる', () => {
    const { getByLabelText, getByRole } = render(<Radio {...mockValues} />);

    const labelOfRadio = getByLabelText(mockValues.label);
    expect(labelOfRadio).toBeInTheDocument();

    const inputOfRadioComponent = getByRole('radio');
    expect(inputOfRadioComponent).toHaveAttribute('type', 'radio');
  });

  test('Radioボタンがクリックできる', async () => {
    const { getByRole } = render(<Radio {...mockValues} />);
    const radioComponent = getByRole('radio', {
      name: mockValues.label,
    });

    expect(radioComponent).toBeEnabled();
    expect(radioComponent.getAttribute('checked')).toBeNull();

    const user = userEvent.setup();
    await user.click(radioComponent);
    expect(radioComponent.getAttribute('checked'));
  });
});
