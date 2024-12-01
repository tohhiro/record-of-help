'use client';
import { useLeavingModal, usePostHelp } from '@/app/(feature)/form/hooks';
import { Button } from '@/app/components/Button';
import { Radio } from '@/app/components/Radio';
import { Textarea } from '@/app/components/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PricesList } from './components/PricesList';
import { convertHelps, validationSchema } from './helpers';

export type Props = {
  person: string;
  items: { helps: string[]; comments: string };
};

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { postHelp, isMutating } = usePostHelp();

  const router = useRouter();

  const onSubmit: SubmitHandler<Props> = async (data) => {
    const helpsData = convertHelps(data.items.helps);

    const sendingData = {
      ...helpsData,
      person: data.person,
      comments: data.items.comments,
    };

    const { status: errorStatus, message: errorMessage } = await postHelp(sendingData);

    if (errorStatus >= 400) {
      // eslint-disable-next-line no-alert
      return alert(`エラーが発生しました: ${errorMessage}`);
    }

    if (errorStatus < 300 && !isMutating) router.replace('/dashboard');
  };

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    control,
  } = useForm<Props>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  useLeavingModal(isDirty);

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
          <div className="my-2 m-auto">
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
            <Button label="Submit" type="submit" intent={isMutating ? 'disabled' : 'primary'} />
          </div>
        </form>
      </div>
    )
  );
}
