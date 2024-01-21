'use client';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchRawsData } from '../../hooks/useFetchRawsData';
import { Table } from '../../components/Table';
import { SelectBox } from '../../components/SelectBox';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { validationSchema } from './validationSchema';
import type { Database } from '../../../supabase/schema';
import { sumObjectArrayData } from './sumObjectArrayData';

export type FetchProps = Database['public']['Tables']['raws_data']['Row'][] | null;

type OptionsType = {
  value: string;
  label: string;
};

type Props = {
  person: OptionsType;
  startDate: string;
  endDate: string;
};

const options: OptionsType[] = [
  { value: 'all', label: 'All' },
  { value: 'eito', label: 'Eito' },
  { value: 'mei', label: 'Mei' },
] as const;

const thData = {
  person: '名前',
  dish: '皿洗い',
  curtain: 'カーテン開閉',
  prepareEat: '食事準備',
  landry: '洗濯物片付け',
  towel: '芽生タオル',
  comments: 'コメント',
  created_at: '日付',
} as const;

export const wageItem = ['dish', 'curtain', 'prepareEat', 'landry', 'towel'];

export default function Page() {
  const { success, conditionsFetch } = useFetchRawsData();
  const fetchData: FetchProps = success.rawsData;

  const sumFetchData = sumObjectArrayData(fetchData, wageItem);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Props>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Props> = (data) => {
    const sendingData = {
      ...data,
      person: data.person.value,
    };

    conditionsFetch(sendingData);
  };

  return (
    <div className="m-8 text-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row justify-center items-center gap-4 my-10 w-100 bg-slate-200 p-10"
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
      <div className="text-2xl">合計：¥{sumFetchData || 0}</div>
      <div className="mt-8">
        <Table thData={thData} tdData={fetchData} />
      </div>
    </div>
  );
}
