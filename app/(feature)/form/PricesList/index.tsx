'use client';
import React, { forwardRef } from 'react';
import { Checkbox } from '@/app/components/Checkbox';
import { useFetchPricesList } from '@/app/hooks/useFetchPricesList';
import { UseFormRegisterReturn } from 'react-hook-form';

export const PricesList = forwardRef(
  (
    {
      register,
    }: {
      register: UseFormRegisterReturn<'items.helps'>;
    },
    _ref,
  ) => {
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
            {..._ref}
            value={`${item.column},${item.value}`}
          />
        ))}
      </>
    );
  },
);
