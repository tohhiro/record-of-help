import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, type Props } from '.';

describe('Button', () => {
  const mockValues: Props = {
    label: 'ボタン',
    type: 'button',
    intent: 'primary',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const user = userEvent.setup();

  test('Buttonコンポーネントがレンダリングされる', () => {
    render(<Button {...mockValues} />);

    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toHaveTextContent(mockValues.label);
  });

  test('Buttonコンポーネントがdisabledでレンダリングされる', () => {
    const mockValuesWithDisabledButton: Props = { ...mockValues, intent: 'disabled' };

    render(<Button {...mockValuesWithDisabledButton} />);

    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toBeDisabled();
  });

  test('Buttonコンポーネントのtype属性がsubmitでレンダリングされる', () => {
    const mockValuesWithAttrSubmit: Props = { ...mockValues, intent: 'primary' };

    render(<Button {...mockValuesWithAttrSubmit} />);

    const buttonComponent = screen.getByRole('button');
    expect(buttonComponent).toHaveAttribute('type', mockValues.type);
  });

  test('ButtonをクリックするとonClickが呼ばれる', async () => {
    render(<Button {...mockValues} />);

    const buttonComponent = screen.getByRole('button');
    await user.click(buttonComponent);

    expect(mockValues.onClick).toHaveBeenCalled();
  });

  test('disabledの場合、ButtonをクリックしてもonClickが呼ばれない', async () => {
    const mockValuesWithAttrSubmit: Props = { ...mockValues, intent: 'disabled' };
    render(<Button {...mockValuesWithAttrSubmit} />);

    const buttonComponent = screen.getByRole('button');
    await user.click(buttonComponent);

    expect(mockValues.onClick).not.toHaveBeenCalled();
  });
});
