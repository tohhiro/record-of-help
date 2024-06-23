'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from './helper/validationSchema';
import { Button } from '@/app/components/Button';
import { Radio } from '@/app/components/Radio';
import { Textarea } from '@/app/components/Textarea';
import { convertHelps } from './helper/convertHelps';
import { usePostHelp } from '@/app/(feature)/form/hooks/usePostHelp';
import { PricesList } from './components/PricesList';

export type Props = {
  person: string;
  items: { helps: string[]; comments: string };
};

export default function Page() {
  const [isSubmitting, isSetSubmitting] = useState<'primary' | 'disabled'>('primary');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const post = usePostHelp();
  const router = useRouter();

  const onSubmit: SubmitHandler<Props> = async (data) => {
    const helpsData = convertHelps(data.items.helps);

    const sendingData = {
      ...helpsData,
      person: data.person,
      comments: data.items.comments,
    };

    isSetSubmitting('disabled');

    const res = await post.postHelp(sendingData);

    if (Number(res.error?.code) >= 400) {
      isSetSubmitting('primary');
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
    isClient && (
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
              <div className="w-80 my-4 m-auto">
                <Radio id="eito" label="eito" {...field} value="eito" />
                <Radio id="mei" label="mei" {...field} value="mei" />
              </div>
            )}
          />
          <div className="my-2 m-auto text-center">
            <p className="text-xs text-red-500">{errors.person && errors.person.message}</p>
          </div>
          <div className="w-80 my-4 m-auto">
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
              <div className="w-80 my-4 m-auto">
                <Textarea id="textarea" label="備考" placeholder="備考があれば入力" {...field} />
              </div>
            )}
          />
          <p className="text-xs text-red-500">
            {errors.items?.comments && errors.items.comments.message}
          </p>

          <div className="w-80 my-4 m-auto">
            <Button label="Submit" type="submit" intent={isSubmitting} />
          </div>
        </form>
      </div>
    )
  );
}
