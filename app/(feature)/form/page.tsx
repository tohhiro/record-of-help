'use client';
import React, { useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from './validationSchema';
import { Button } from '../../components/Button';
import { Radio } from '../../components/Radio';
import { Textarea } from '../../components/Textarea';
import { convertHelps } from './convertHelps';
import { usePostHelp } from '../../hooks/usePostHelp';
import { PricesList } from './PricesList';

export type Props = {
  person: string;
  items: { helps: string[]; comments: string };
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
  // const token = useCheckLocalStorageToken();

  // useEffect(() => {
  //   if (!token) router.replace('/login');
  // }, [])

  // const pricesList = pricesListRaw?.data?.map((item) => ({
  //   id: item.id,
  //   label: item.label,
  //   column: item.help,
  //   value: item.prices_list[0].price,
  // }));

  const onSubmit: SubmitHandler<Props> = async (data) => {
    const helpsData = convertHelps(data.items.helps);

    const sendingData = {
      ...helpsData,
      person: data.person,
      comments: data.items.comments,
    };

    setSubmitButton(true);

    const res = await post.postHelp(sendingData);

    if (Number(res.error?.code) >= 400) {
      setSubmitButton(false);
      // eslint-disable-next-line no-alert
      return alert('送信に失敗しました');
    }

    router.replace('/dashboard');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Props>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  return (
    <div className="w-100  h-200 m-10 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="person"
          control={control}
          defaultValue=""
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
          <p className="text-xs text-red-500">{errors.person && errors.person.message}</p>
        </div>
        <div className="w-80 my-8 m-auto">
          <Controller
            name="items.helps"
            control={control}
            defaultValue={[]}
            rules={{ required: true }}
            render={() => (
              <>
                <ErrorBoundary fallback={<p>エラーが発生しました</p>}>
                  <Suspense fallback={<p>...Loading</p>}>
                    <PricesList register={{ ...register('items.helps') }} />
                  </Suspense>
                </ErrorBoundary>
              </>
            )}
          />

          <p className="text-xs text-red-500">
            {errors.items?.helps && errors.items.helps.message}
          </p>
        </div>

        <Controller
          name="items.comments"
          control={control}
          defaultValue=""
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className="w-80 my-8 m-auto">
              <Textarea id="textarea" label="備考" placeholder="備考があれば入力" {...field} />
            </div>
          )}
        />
        <p className="text-xs text-red-500">
          {errors.items?.comments && errors.items.comments.message}
        </p>

        <Button label="Submit" type="submit" style="primary" disabled={submitButton} />
      </form>
    </div>
  );
}
