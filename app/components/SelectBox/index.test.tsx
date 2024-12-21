import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Props, SelectBox } from '.';

const mockOptions: Props[] = [
  { value: 'all', label: 'All' },
  { value: 'eito', label: 'Eito' },
  { value: 'mei', label: 'Mei' },
];

const mockValues = {
  options: mockOptions,
  id: 'select',
  label: '選択してください',
};

describe('SelectBox', () => {
  test('SelectBoxがレンダーされる', () => {
    render(<SelectBox {...mockValues} />);
  });

  test('SelectBoxのそれぞれの要素をクリックすると、対応する値になっている', async () => {
    const { getByRole, getByText } = render(<SelectBox {...mockValues} />);

    const select = getByRole('combobox');
    const user = userEvent.setup();
    await user.click(select);

    mockOptions.forEach(async (option) => {
      await user.click(getByText(option.label));
      expect(select).toHaveAttribute('value', option.value);
    });
  });
});
