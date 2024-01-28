'use client';
import React, { forwardRef } from 'react';
import { Checkbox } from '../../../components/Checkbox';
import { useFetchPricesList } from '../../../hooks/useFetchPricesList';
import { UseFormRegisterReturn } from 'react-hook-form';

export const PricesList = forwardRef((register: UseFormRegisterReturn<'helps'>, _ref) => {
  const pricesListRaw = useFetchPricesList();

  const pricesList = pricesListRaw?.data?.map((item) => ({
    id: item.id,
    label: item.label,
    column: item.help,
    value: item.prices_list[0].price,
  }));

  return pricesList?.map((item) => (
    <Checkbox
      key={item.id}
      id={item.id}
      label={item.label}
      value={`${item.column},${item.value}`}
      {...register}
      {..._ref}
    />
  ));
});
