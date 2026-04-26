'use client';
import { useState } from 'react';
import { useLeavingModal } from '@/app/(feature)/form/hooks';
import { postHelp } from '../actions';
import { Button } from '@/app/components/Button';
import { ErrorContainer } from '@/app/components/ErrorContainer';
import { Radio } from '@/app/components/Radio';
import { Section } from '@/app/components/Section';
import { Textarea } from '@/app/components/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { PricesList } from '../components/PricesList';
import { convertHelps, validationSchema, type FormProps } from '../helpers';
import { type PricesHelpsList } from '@/app/types';

type Props = {
    pricesList: PricesHelpsList['data']
}

export const FormClient = ({ pricesList }: Props) => {
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const helpsData = convertHelps(data.items.helps);

    const sendingData = {
      ...helpsData,
      person: data.person,
      comments: data.items.comments || '',
    };

    setIsMutating(true);

    try {
      await postHelp(sendingData);
      router.replace('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`エラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setIsMutating(false);
    }
  };

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    control,
  } = useForm<FormProps>({
    mode: 'onChange',
    defaultValues: { person: '', items: { helps: [], comments: '' } },
    resolver: zodResolver(validationSchema),
  });

  useLeavingModal(isDirty);

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
            <Section>
              <Radio id="eito" label="eito" {...field} value="eito" />
              <Radio id="mei" label="mei" {...field} value="mei" />
              <Radio id="tohhiro" label="tohhiro" {...field} value="tohhiro" />
            </Section>
          )}
        />
        <div className="my-2 m-auto">
          <ErrorContainer>{errors.person && errors.person.message}</ErrorContainer>
        </div>
        <Section>
            <PricesList register={{ ...register('items.helps') }} pricesList={pricesList} />
            <ErrorContainer>{errors.items?.helps && errors.items.helps.message}</ErrorContainer>
        </Section>

        <Controller
          name="items.comments"
          control={control}
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
  );
};
