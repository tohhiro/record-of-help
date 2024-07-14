'use client';
import React, { useState, Suspense } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { dashboardStyles } from './index.styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchRawsData } from '@/app/(feature)/dashboard/hooks/useFetchRawsData';
import { SelectBox } from '@/app/components/SelectBox';
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import { validationSchema } from './helper/validationSchema';
import { sumObjectArrayData } from './helper/subObjectArrayData';
import { DashboardTable, Props as TdProps } from './components/DashboardTable';

type OptionsType = {
  value: string;
  label: string;
};

const options: OptionsType[] = [
  { value: 'all', label: 'All' },
  { value: 'eito', label: 'Eito' },
  { value: 'mei', label: 'Mei' },
];

type Props = {
  person: OptionsType;
  selectDate: {
    startDate: string;
    endDate: string;
  };
};

const thData = {
  person: '名前',
  dish: '皿洗い',
  curtain: 'カーテン開閉',
  prepareEat: '食事準備',
  landry: '洗濯物片付け',
  special: 'スペシャル',
  comments: 'コメント',
  created_at: '日付',
};

const wageItem = ['dish', 'curtain', 'prepareEat', 'landry', 'special'];

const getNowMonthFirstLast = () => {
  const nowDate = new Date();
  const nowMonthFirst = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
  const nowMonthLast = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);
  return {
    startDate: nowMonthFirst.toISOString().split('T')[0],
    endDate: nowMonthLast.toISOString().split('T')[0],
  };
};

export default function Page() {
  const [isDisplaySearchPanel, setIsDisplaySearchPanel] = useState(false);
  const { success, conditionsFetch } = useFetchRawsData();
  const fetchData: TdProps = success.rawsData;

  const { startDate, endDate } = getNowMonthFirstLast();

  const sumFetchData = sumObjectArrayData(fetchData, wageItem);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: {
      person: { value: '', label: '' },
      selectDate: {
        startDate,
        endDate,
      },
    },
    resolver: zodResolver(validationSchema),
  });

  const onDisplaySearchPanel = () => {
    setIsDisplaySearchPanel((prev) => !prev);
  };

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
      <div className="my-10">
        <Button
          type="button"
          intent="secondary"
          label={isDisplaySearchPanel ? '表示' : '非表示'}
          onClick={onDisplaySearchPanel}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={isDisplaySearchPanel ? dashboardStyles.hidden : dashboardStyles.formContainer}
      >
        <div className="w-[10em]">
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
          <Button type="submit" intent="primary" label="検索" />
        </div>
      </form>
      <div className="text-2xl">合計：¥{sumFetchData || 0}</div>
      <div
        className={`${dashboardStyles.tableContainer} ${
          isDisplaySearchPanel ? 'h-[560px]' : 'h-56'
        }`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardTable th={thData} td={fetchData} />
        </Suspense>
      </div>
    </div>
  );
}
