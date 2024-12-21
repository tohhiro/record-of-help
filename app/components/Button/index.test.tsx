import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, Props } from '.';

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
    const { getByRole } = render(<Button {...mockValues} />);

    const buttonComponent = getByRole('button');
    expect(buttonComponent).toHaveTextContent(mockValues.label);
  });

  test('Buttonコンポーネントがdisabledでレンダリングされる', () => {
    const mockValuesWithDisabledButton: Props = {
      ...mockValues,
      intent: 'disabled',
    };

    const { getByRole } = render(<Button {...mockValuesWithDisabledButton} />);

    const buttonComponent = getByRole('button');
    expect(buttonComponent).toBeDisabled();
  });

  test('Buttonコンポーネントのtype属性がsubmitでレンダリングされる', () => {
    const mockValuesWithAttrSubmit: Props = {
      ...mockValues,
      intent: 'primary',
    };

    const { getByRole } = render(<Button {...mockValuesWithAttrSubmit} />);

    const buttonComponent = getByRole('button');
    expect(buttonComponent).toHaveAttribute('type', mockValues.type);
  });

  test('ButtonをクリックするとonClickが呼ばれる', async () => {
    const { getByRole } = render(<Button {...mockValues} />);

    const buttonComponent = getByRole('button');
    await user.click(buttonComponent);

    expect(mockValues.onClick).toHaveBeenCalled();
  });

  test('disabledの場合、ButtonをクリックしてもonClickが呼ばれない', async () => {
    const mockValuesWithAttrSubmit: Props = {
      ...mockValues,
      intent: 'disabled',
    };
    const { getByRole } = render(<Button {...mockValuesWithAttrSubmit} />);

    const buttonComponent = getByRole('button');
    await user.click(buttonComponent);

    expect(mockValues.onClick).not.toHaveBeenCalled();
  });
});
