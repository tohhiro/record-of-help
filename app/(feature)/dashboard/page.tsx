'use client';
import React from 'react';
import { useFetchRawsData } from '@/app/hooks/useFetchRawsData';

export default function Page() {
  const fetch = useFetchRawsData();
  const { data } = fetch.success();

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
