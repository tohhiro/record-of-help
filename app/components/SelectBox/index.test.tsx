import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectBox } from '.';

const mockOptions = [
  { value: 'all', label: 'All' },
  { value: 'eito', label: 'Eito' },
  { value: 'mei', label: 'Mei' },
];

const mockValues = { options: mockOptions, id: 'select', label: '選択してください' };

describe('SelectBox', () => {
  test('SelectBoxがレンダーされる', () => {
    render(<SelectBox {...mockValues} />);
  });

  test('SelectBoxのそれぞれの要素をクリックすると、対応する値になっている', async () => {
    render(<SelectBox {...mockValues} />);

    const select = screen.getByRole('combobox');
    const user = userEvent.setup();
    await user.click(select);

    mockOptions.forEach(async (option) => {
      await user.click(screen.getByText(option.label));
      expect(select).toHaveAttribute('value', option.value);
    });
  });
});
