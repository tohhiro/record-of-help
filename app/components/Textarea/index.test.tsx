import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Props, Textarea } from '.';

describe('Textarea', () => {
  const mockValues: Props = {
    id: 'textarea',
    label: 'Textarea Label',
    placeholder: 'テキストを入力してください',
  };

  test('textareaがレンダーされる', () => {
    const { getByLabelText, queryByPlaceholderText } = render(<Textarea {...mockValues} />);
    const labelOfTextareaComponent = getByLabelText(mockValues.label);
    expect(labelOfTextareaComponent).toBeInTheDocument();
    const textareaComponent = queryByPlaceholderText(mockValues.placeholder);
    expect(textareaComponent).toHaveAttribute('placeholder', mockValues.placeholder);
  });

  test('textareaに入力ができる', async () => {
    const { getByRole } = render(<Textarea {...mockValues} />);
    const textareaComponent = getByRole('textbox', {
      name: mockValues.label,
    });

    const typeText = 'テスト';
    const user = userEvent.setup();
    await user.type(textareaComponent, typeText);
    expect(textareaComponent).toHaveDisplayValue(typeText);
  });
});
