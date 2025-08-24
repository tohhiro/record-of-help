import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, type Props } from '.';

describe('Radio', () => {
  const mockValues = [
    { id: 'radio1', label: 'Radio Label1', value: 'radioValue1', name: 'radioName' },
    { id: 'radio2', label: 'Radio Label2', value: 'radioValue2', name: 'radioName' },
  ];

  const renderSuccess = (mocks: Props[] = mockValues) => {
    render(
      <div>
        {mocks.map((value) => (
          <Radio key={value.id} {...value} />
        ))}
      </div>,
    );
  };

  test('RadioボタンがPropsに渡された数だけレンダリングされる', () => {
    renderSuccess();

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBe(mockValues.length);

    radioButtons.forEach((radio) => {
      expect(radio).toHaveAttribute('type', 'radio');
    });
  });

  test('Radioボタンがクリックでチェックでき、別のRadioボタンをクリックすると、もう一方のRadioボタンのチェックが外れる', async () => {
    const user = userEvent.setup();
    renderSuccess();

    const radioButtons = screen.getAllByRole('radio');

    await user.click(radioButtons[0]);
    expect(radioButtons[0]).toBeChecked();
    expect(radioButtons[1]).not.toBeChecked();

    await user.click(radioButtons[1]);
    expect(radioButtons[1]).toBeChecked();
    expect(radioButtons[0]).not.toBeChecked();
  });
});
