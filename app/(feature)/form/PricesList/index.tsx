'use client';
import React from 'react';
import { Checkbox } from '@/app/components/Checkbox';
import { useFetchPricesList } from '@/app/hooks/useFetchPricesList';
import { UseFormRegisterReturn } from 'react-hook-form';

export const PricesList = ({ register }: { register: UseFormRegisterReturn<'items.helps'> }) => {
  const pricesListRaw = useFetchPricesList();

  if (pricesListRaw?.isLoading) return <>Loading中やで</>;

  if (pricesListRaw?.error) throw new Error(pricesListRaw.error.message);

  const pricesList = pricesListRaw?.data?.map((item) => ({
    id: item.id,
    label: item.label,
    column: item.help,
    value: item.prices_list[0].price,
  }));

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
