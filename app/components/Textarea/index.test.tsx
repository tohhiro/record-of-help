import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '.';

const setup = (jsx: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('Textarea', () => {
  const mockValues = {
    id: 'textarea',
    label: 'Textarea Label',
    placeholder: 'テキストを入力してください',
  };

  test('textareaがレンダーされる', () => {
    setup(<Textarea {...mockValues} />);
    const labelOfTextareaComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfTextareaComponent).toBeInTheDocument();
    const textareaComponent = screen.queryByPlaceholderText(mockValues.placeholder!);
    expect(textareaComponent).toHaveAttribute('placeholder', mockValues.placeholder);
  });

  test('textareaに入力ができる', async () => {
    const { user } = setup(<Textarea {...mockValues} />);
    const textareaComponent = screen.getByRole('textbox', { name: mockValues.label });

    const typeText = 'テスト';
    await user.type(textareaComponent, typeText);
    expect(textareaComponent).toHaveDisplayValue(typeText);
  });
});
