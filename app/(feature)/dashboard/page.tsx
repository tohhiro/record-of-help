'use client';
import React from 'react';
import { useFetchRawsData } from '../../hooks/useFetchRawsData';
import { Table } from '../../components/Table';

export default function Page() {
  const fetch = useFetchRawsData();
  const { data } = fetch.success();

  return <div className="m-10 text-center">{<Table data={data} />}</div>;
}
