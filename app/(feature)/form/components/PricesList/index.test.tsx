import { PricesList } from '@/app/(feature)/form/components/PricesList';
import { mockPricesListRaw } from '@/mocks/pricesList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type UseFormRegisterReturn } from 'react-hook-form';

const setup = (jsx: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('PricesList', () => {
  const register: UseFormRegisterReturn<'items.helps'> = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'items.helps',
  };

  test('hooksからリストのデータが変える場合、チェックボックスがレンダリングされる', () => {
    setup(<PricesList register={register} pricesList={mockPricesListRaw.data}/>);

    const checkbox = screen.getByLabelText('皿洗い');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('pricesListが空配列の場合、チェックボックスがレンダリングされない', () => {
    setup(<PricesList register={register} pricesList={[]}/>);

    const checkbox = screen.queryByLabelText('皿洗い');
    expect(checkbox).not.toBeInTheDocument();
  });

  test('hooksからリストのデータが変える場合、チェックボックスがクリックでチェックを入れ外しできる', async () => {
    const { user } = setup(<PricesList register={register} pricesList={mockPricesListRaw.data}/>);

    const checkbox = screen.getByLabelText('皿洗い');
    expect(checkbox).toBeInTheDocument();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
