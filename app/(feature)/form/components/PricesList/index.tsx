import { useFetchPricesList } from '@/app/(feature)/form/hooks';
import { Checkbox } from '@/app/components/Checkbox';
import { UseFormRegisterReturn } from 'react-hook-form';
import { createPricesList } from './helpers';

export const PricesList = ({ register }: { register: UseFormRegisterReturn<'items.helps'> }) => {
  const pricesListRaw = useFetchPricesList();

  const pricesList = createPricesList(pricesListRaw);

  return (
    <>
      {pricesList?.map((item) => (
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
