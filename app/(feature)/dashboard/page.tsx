'use client';
import React, { memo } from 'react';
import { useFetchRawsData } from '../../hooks/useFetchRawsData';
import { Table } from '../../components/Table';
import { SelectBox } from '../../components/SelectBox';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const SearchPanel = memo(() => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'eito', label: 'Eito' },
    { value: 'mei', label: 'Mei' },
  ];

  return (
    <>
      <form className="flex justify-center items-center gap-4 my-10 w-100 bg-slate-200 p-10">
        <div className="w-100">
          <SelectBox options={options} id="person_select" label="対象者を選択" />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Input type="date" id="start" label="開始" />
          <Input type="date" id="end" label="終了" />
        </div>
        <div className="mt-8">
          <Button type="submit" style="primary" label="検索" />
        </div>
      </form>
    </>
  );
});

export default function Page() {
  const fetch = useFetchRawsData();
  const { data } = fetch.success();

  return (
    <div className="m-10 text-center">
      <SearchPanel />
      <Table data={data} />
    </div>
  );
}
