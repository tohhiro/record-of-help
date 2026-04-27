import { Checkbox } from '@/app/components/Checkbox';
import { type PricesHelpsList } from '@/app/types';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { createPricesList } from './helpers';

type Props = {
  register: UseFormRegisterReturn<'items.helps'>;
  pricesList: PricesHelpsList['data'];
}

export const PricesList = ({ register, pricesList }: Props) => {
  const formattedList = createPricesList(pricesList);

  return (
    <>
      {formattedList?.map((item) => (
        <Checkbox
          key={item.id}
          label={item.label}
          id={item.id}
          {...register}
          value={`${item.column},${item.value}`}
        />
      ))}
    </>
  );
};
