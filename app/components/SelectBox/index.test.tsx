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
    const { container } = render(<SelectBox {...mockValues} />);

    const select = screen.getByRole('combobox');
    const user = userEvent.setup();

    for (const option of mockOptions) {
      await user.click(select);
      await user.click(await screen.findByText(option.label));
      // react-selectは選択値をhidden inputに格納する
      const hiddenInput = container.querySelector('input[type="hidden"][name="selects"]');
      expect(hiddenInput).toHaveValue(option.value);
    }
  });
});
