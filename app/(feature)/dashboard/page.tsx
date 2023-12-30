'use client';
import React from 'react';
import { useFetchRawsData } from '@/app/hooks/useFetchRawsData';
import { useFetchPricesList } from '@/app/hooks/useFetchPricesList';

export default function Page() {
  const fetch = useFetchRawsData();
  const { data } = fetch.success();

  const price = useFetchPricesList();
  const { data: priceList } = price.success();

  console.log(priceList);

  return (
    <div className="m-10 text-center">
      <span className="text-lg">Dashboard</span>
      {data?.map((item, idx) => (
        <div key={idx}>
          <span>{item.person}</span>
        </div>
      ))}
    </div>
  );
}
