'use client';
import { useSignIn } from '@/app/(feature)/login/hooks';
import { Button } from '@/app/components/Button';
import { ErrorContainer } from '@/app/components/ErrorContainer';
import { Input } from '@/app/components/Input';
import { Section } from '@/app/components/Section';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { validationSchema, type LoginProps } from './helpers';

export default function Page() {
  const [submitButton, setSubmitButton] = useState<'primary' | 'disabled'>('primary');

  const {
    formState: { errors },
    control,
    getValues,
    trigger,
  } = useForm<LoginProps>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  const { signIn } = useSignIn();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginProps> = async (inputData) => {
    setSubmitButton('disabled');
    await signIn(inputData, {
      onSuccess: (isAdmin) => {
        router.replace(isAdmin ? '/form' : '/dashboard');
      },
      onError: (error) => {
        // eslint-disable-next-line no-alert
        alert(`ログインに失敗しました。\n ${error?.message ?? '不明なエラーが発生しました'}`);
        setSubmitButton('primary');
      },
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isValid = await trigger();
    if (!isValid) return;
    const values = getValues();
    await onSubmit(values);
  };

  return (
    <div className={'w-100  h-200 m-10 text-center'}>
      <form
        onSubmit={handleFormSubmit}
      >
        <Section>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input id="email" label="メールアドレス" type="text" {...field} />
            )}
          />
          <ErrorContainer>{errors.email?.message && errors.email?.message}</ErrorContainer>
        </Section>
        <Section>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input id="password" label="パスワード" type="password" {...field} />
            )}
          />
          <ErrorContainer>{errors.password?.message && errors.password?.message}</ErrorContainer>
        </Section>
        <Section>
          <Button label="ログイン" type="submit" intent={submitButton} />
        </Section>
      </form>
    </div>
  );
}
