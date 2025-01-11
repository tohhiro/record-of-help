import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Props, Radio } from '.';

describe('Radio', () => {
  const mockValues: Props = {
    id: 'radio1',
    label: 'Radio Label',
    value: 'radioValue',
  };

  test('Radioボタンがレンダーされる', () => {
    render(<Radio {...mockValues} />);

    const labelOfRadio = screen.getByLabelText(mockValues.label);
    expect(labelOfRadio).toBeInTheDocument();

    const inputOfRadioComponent = screen.getByRole('radio');
    expect(inputOfRadioComponent).toHaveAttribute('type', 'radio');
  });

  test('Radioボタンがクリックできる', async () => {
    render(<Radio {...mockValues} />);
    const radioComponent = screen.getByRole('radio', {
      name: mockValues.label,
    });

    expect(radioComponent).toBeEnabled();
    expect(radioComponent.getAttribute('checked')).toBeNull();

    const user = userEvent.setup();
    await user.click(radioComponent);
    expect(radioComponent.getAttribute('checked'));
  });
});
