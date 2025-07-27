'use client';
import { useLeavingModal, usePostHelp } from '@/app/(feature)/form/hooks';
import { Button } from '@/app/components/Button';
import { ErrorContainer } from '@/app/components/ErrorContainer';
import { Radio } from '@/app/components/Radio';
import { Section } from '@/app/components/Section';
import { Textarea } from '@/app/components/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PricesList } from './components/PricesList';
import { convertHelps, FormProps, validationSchema } from './helpers';

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { postHelp, isMutating } = usePostHelp();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const helpsData = convertHelps(data.items.helps);

    const sendingData = {
      ...helpsData,
      person: data.person,
      comments: data.items.comments || '',
    };

    await postHelp(sendingData, {
      onSuccess: () => {
        router.replace('/dashboard');
      },
      onError: (_error) => {
        // eslint-disable-next-line no-alert
        alert(`エラーが発生しました: ${_error.message}`);
      },
    });
  };

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    control,
  } = useForm<FormProps>({
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
              <Section>
                <Radio id="eito" label="eito" {...field} value="eito" />
                <Radio id="mei" label="mei" {...field} value="mei" />
              </Section>
            )}
          />
          <div className="my-2 m-auto">
            <ErrorContainer>{errors.person && errors.person.message}</ErrorContainer>
          </div>
          <Section>
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

            <ErrorContainer>{errors.items?.helps && errors.items.helps.message}</ErrorContainer>
          </Section>

          <Controller
            name="items.comments"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Section>
                <Textarea id="textarea" label="備考" placeholder="備考があれば入力" {...field} />
              </Section>
            )}
          />
          <ErrorContainer>{errors.items?.comments && errors.items.comments.message}</ErrorContainer>

          <Section>
            <Button label="Submit" type="submit" intent={isMutating ? 'disabled' : 'primary'} />
          </Section>
        </form>
      </div>
    )
  );
}
