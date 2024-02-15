import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Textarea, Props } from '.';
import userEvent from '@testing-library/user-event';

describe('Textarea', () => {
  test('textareaがレンダーされる', () => {
    const mockValues: Props = {
      id: 'textarea',
      label: 'Textarea Label',
      placeholder: 'テキストを入力してください',
    };
    render(<Textarea {...mockValues} />);
    const labelOfTextareaComponent = screen.getByLabelText(mockValues.label);
    expect(labelOfTextareaComponent).toBeInTheDocument();
    const textareaComponent = screen.queryByPlaceholderText(mockValues.placeholder);
    expect(textareaComponent).toHaveAttribute('placeholder', mockValues.placeholder);
  });
  test('textareaに入力ができる', async () => {
    const mockValues: Props = {
      id: 'textarea',
      label: 'Textarea Label',
      placeholder: 'テキストを入力してください',
    };
    render(<Textarea {...mockValues} />);
    const textareaComponent = screen.getByRole('textbox', {
      name: mockValues.label,
    });
    const typeText = 'テスト';
    const user = userEvent.setup();
    await user.type(textareaComponent, typeText);
    expect((textareaComponent as HTMLTextAreaElement).value).toBe(typeText);
  });
});
