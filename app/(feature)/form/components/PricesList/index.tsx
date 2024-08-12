import React from 'react';
import { Checkbox } from '@/app/components/Checkbox';
import { useFetchPricesList } from '@/app/(feature)/form/hooks/useFetchPricesList';
import { UseFormRegisterReturn } from 'react-hook-form';
import { createPricesList } from './helper/createPricesList';

export const PricesList = ({ register }: { register: UseFormRegisterReturn<'items.helps'> }) => {
  const pricesListRaw = useFetchPricesList();

  const pricesList = createPricesList(pricesListRaw);

  // if (pricesListRaw?.error) return null;

  // const pricesList = pricesListRaw?.data?.map((item) => ({
  //   id: item.id,
  //   label: item.label,
  //   column: item.help,
  //   value: item.prices_list[0].price,
  // }));

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
