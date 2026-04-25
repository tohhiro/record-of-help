import { PricesList } from '@/app/(feature)/form/components/PricesList';
import { mockPricesListRaw } from '@/mocks/pricesList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type UseFormRegisterReturn } from 'react-hook-form';

describe('PricesList', () => {
  const user = userEvent.setup();

  const register: UseFormRegisterReturn<'items.helps'> = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'items.helps',
  };

  test('hooksからリストのデータが変える場合、チェックボックスがレンダリングされる', () => {
    render(<PricesList register={register} pricesList={mockPricesListRaw.data}/>);

    const checkbox = screen.getByLabelText('皿洗い');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('pricesListが空配列の場合、チェックボックスがレンダリングされない', () => {
    render(<PricesList register={register} pricesList={[]}/>);

    const checkbox = screen.queryByLabelText('皿洗い');
    expect(checkbox).not.toBeInTheDocument();
  });

  test('hooksからリストのデータが変える場合、チェックボックスがクリックでチェックを入れ外しできる', async () => {
    render(<PricesList register={register} pricesList={mockPricesListRaw.data}/>);

    const checkbox = screen.getByLabelText('皿洗い');
    expect(checkbox).toBeInTheDocument();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
