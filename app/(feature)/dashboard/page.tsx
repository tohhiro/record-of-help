'use client';
import React, { useCallback, Suspense } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { dashboardStyles } from './index.styles';
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
  selectDate: {
    startDate: string;
    endDate: string;
  };
};

type IsDirtyFieldsProps = Partial<
  Readonly<{
    person?:
      | {
          value?: boolean | undefined;
          label?: boolean | undefined;
        }
      | undefined;
    selectDate?:
      | {
          startDate?: boolean | undefined;
          endDate?: boolean | undefined;
        }
      | undefined;
  }>
>;

const options: OptionsType[] = [
  { value: 'all', label: 'All' },
  { value: 'eito', label: 'Eito' },
  { value: 'mei', label: 'Mei' },
];

const thData = {
  person: '名前',
  dish: '皿洗い',
  curtain: 'カーテン開閉',
  prepareEat: '食事準備',
  landry: '洗濯物片付け',
  special: 'スペシャル',
  comments: 'コメント',
  created_at: '日付',
} as const;

const wageItem = ['dish', 'curtain', 'prepareEat', 'landry', 'special'];

export default function Page() {
  const { success, conditionsFetch } = useFetchRawsData();
  const fetchData: FetchProps = success.rawsData;

  const sumFetchData = sumObjectArrayData(fetchData, wageItem);

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<Props>({
    resolver: zodResolver(validationSchema),
  });

  const isCheckingDirty = useCallback(
    (dirtyFieldsObj: IsDirtyFieldsProps) => {
      const { person, selectDate } = dirtyFieldsObj;
      if (!person || !selectDate?.startDate || !selectDate?.endDate) return false;
      return person && selectDate?.startDate && selectDate?.endDate;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dirtyFields !== undefined],
  );

  const onSubmit: SubmitHandler<Props> = (data) => {
    const sendingData = {
      person: data.person.value === 'all' ? '' : data.person.value,
      startDate: data.selectDate.startDate,
      endDate: data.selectDate.endDate,
    };

    conditionsFetch(sendingData);
  };

  return (
    <div className={dashboardStyles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={dashboardStyles.formContainer}>
        <div className="w-100">
          <Controller
            name="person"
            control={control}
            defaultValue={{ value: '', label: '' }}
            render={({ field }) => (
              <SelectBox options={options} id="person_select" label="対象者を選択" {...field} />
            )}
          />
          <p className={dashboardStyles.errorMessageContainer}>
            {errors.person && errors.person.message}
          </p>
        </div>

        <div className={dashboardStyles.inputDateContainer}>
          <div>
            <Controller
              name="selectDate.startDate"
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="date" id="start" label="開始" {...field} />}
            />
            <p className={dashboardStyles.errorMessageContainer}>
              {errors.selectDate?.startDate && errors.selectDate.startDate.message}
            </p>
          </div>
          <div>
            <Controller
              name="selectDate.endDate"
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="date" id="end" label="終了" {...field} />}
            />
            <p className={dashboardStyles.errorMessageContainer}>
              {errors.selectDate?.endDate && errors.selectDate.endDate.message}
            </p>
          </div>
        </div>
        <div className={dashboardStyles.sendingButton}>
          <Button
            type="submit"
            style="primary"
            label="検索"
            disabled={!isCheckingDirty(dirtyFields)}
          />
        </div>
      </form>
      <div className="text-2xl">合計：¥{sumFetchData || 0}</div>
      <div className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Table thData={thData} tdData={fetchData} />
        </Suspense>
      </div>
    </div>
  );
}
