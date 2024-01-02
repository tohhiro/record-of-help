'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from './validationSchema';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { Radio } from '../../components/Radio';
import { Textarea } from '../../components/Textarea';
import { convertHelps } from './convertHelps';
import { usePostHelp } from '@/app/hooks/usePostHelp';
import { useFetchPricesList } from '@/app/hooks/useFetchPricesList';

export type Props = {
  person: string;
  helps: string[];
  comments: string;
};

export type Helps = {
  id: string;
  label: string;
  column: string;
  value: number;
};

export default function Page() {
  const [submitButton, setSubmitButton] = useState<boolean>(false);

  const post = usePostHelp();
  const router = useRouter();

  const price = useFetchPricesList();
  const priceList: Helps[] | undefined = price.success();
  console.log('priceList: ', priceList);

  const onSubmit: SubmitHandler<Props> = async (data) => {
    const helpsData = convertHelps(data.helps);

    const sendingData = {
      ...helpsData,
      person: data.person,
      comments: data.comments,
    };

    console.log('sendingData', sendingData);

    setSubmitButton(true);

    const res = await post.postHelp(sendingData);

    if (Number(res.error?.code) >= 400) {
      setSubmitButton(false);
      // eslint-disable-next-line no-alert
      return alert('ログインに失敗しました。 \n メールアドレスかパスワードが間違っています。');
    }

    router.replace('/dashboard');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Props>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <div className="w-100  h-200 m-10 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="person"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="w-80 my-8 m-auto">
              <Radio id="eito" label="eito" {...field} value="eito" />
              <Radio id="mei" label="mei" {...field} value="mei" />
            </div>
          )}
        />
        <div className="my-2 m-auto text-center">
          {errors.person && <p className="text-xs text-red-500">必須項目です</p>}
        </div>
        <div className="w-80 my-8 m-auto">
          {priceList ? (
            priceList.map((item) => (
              <Checkbox
                key={item.id}
                id={item.id}
                label={item.label}
                value={`${item.column},${item.value}`}
                {...register('helps')}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
          {errors.helps && <p className="text-xs text-red-500">必須項目です</p>}
        </div>

        <Controller
          name="comments"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="w-80 my-8 m-auto">
              <Textarea id="textarea" label="備考" placeholder="備考があれば入力" {...field} />
            </div>
          )}
        />

        <Button label="Submit" type="submit" style="primary" disabled={submitButton} />
      </form>
    </div>
  );
}
