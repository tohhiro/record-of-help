'use client';
import React, { memo } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchRawsData } from '../../hooks/useFetchRawsData';
import { Table } from '../../components/Table';
import { SelectBox } from '../../components/SelectBox';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { validationSchema } from './validationSchema';

type OptionsType = {
  value: string;
  label: string;
};

type Props = {
  person: OptionsType;
  startDate: string;
  endDate: string;
};

const SearchPanel = memo(() => {
  const options: OptionsType[] = [
    { value: 'all', label: 'All' },
    { value: 'eito', label: 'Eito' },
    { value: 'mei', label: 'Mei' },
  ] as const;

  const { conditionsFetch } = useFetchRawsData();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Props>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Props> = async (data) => {
    const sendingData = {
      ...data,
      person: data.person.value,
    };
    // eslint-disable-next-line no-console
    console.log(sendingData);
    const fetchConditions = await conditionsFetch(sendingData);
    // eslint-disable-next-line no-console
    console.log(fetchConditions);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center gap-4 my-10 w-100 bg-slate-200 p-10"
      >
        <div className="w-100">
          <Controller
            name="person"
            control={control}
            defaultValue={{ value: '', label: '' }}
            render={({ field }) => (
              <SelectBox options={options} id="person_select" label="対象者を選択" {...field} />
            )}
          />
          <p className="text-xs text-red-500">{errors.person && errors.person.message}</p>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="date" id="start" label="開始" {...field} />}
            />
            <p className="text-xs text-red-500">{errors.startDate && errors.startDate.message}</p>
          </div>
          <div>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="date" id="end" label="終了" {...field} />}
            />
            <p className="text-xs text-red-500">{errors.endDate && errors.endDate.message}</p>
          </div>
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
