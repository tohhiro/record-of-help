import { PricesList } from '@/app/(feature)/form/components/PricesList';
import { useFetchPricesList } from '@/app/(feature)/form/hooks/useFetchPricesList';
import { mockPricesListRaw } from '@/mocks/pricesList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UseFormRegisterReturn } from 'react-hook-form';

jest.mock('../../hooks/useFetchPricesList');
const mockedUseFetchPricesList = jest.mocked(useFetchPricesList);

const mockFailedData = {
  data: [],
  error: { message: 'string', details: 'string', hint: 'string', code: 'string' },
};

describe('PricesList', () => {
  const user = userEvent.setup();

  const register: UseFormRegisterReturn<'items.helps'> = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'items.helps',
  };

  afterEach(() => {
    mockedUseFetchPricesList.mockReset();
  });

  test('hooksからリストのデータが変える場合、チェックボックスがレンダリングされる', () => {
    mockedUseFetchPricesList.mockReturnValue(mockPricesListRaw);

    render(<PricesList register={register} />);

    const checkbox = screen.getByLabelText('皿洗い');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('hooksからエラーが返る場合、チェックボックスがレンダリングされない', () => {
    mockedUseFetchPricesList.mockReturnValue(mockFailedData);
    render(<PricesList register={register} />);

    const checkbox = screen.queryByLabelText('皿洗い');
    expect(checkbox).not.toBeInTheDocument();
  });

  test('hooksからリストのデータが変える場合、チェックボックスがクリックでチェックを入れ外しできる', async () => {
    mockedUseFetchPricesList.mockReturnValue(mockPricesListRaw);

    render(<PricesList register={register} />);

    const checkbox = screen.getByLabelText('皿洗い');
    expect(checkbox).toBeInTheDocument();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
