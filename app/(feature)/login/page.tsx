'use client';
import { useSignIn } from '@/app/(feature)/login/hooks';
import { Button } from '@/app/components/Button';
import { ErrorContainer } from '@/app/components/ErrorContainer';
import { Input } from '@/app/components/Input';
import { Section } from '@/app/components/Section';
import { useStore } from '@/app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LoginProps, validationSchema } from './helpers';

export default function Page() {
  const [submitButton, setSubmitButton] = useState<'primary' | 'disabled'>('primary');

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<LoginProps>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  const { signIn } = useSignIn();
  const router = useRouter();
  const loginAuth = useStore((state) => state.loginUser.auth);

  const onSubmit: SubmitHandler<LoginProps> = async (inputData) => {
    setSubmitButton('disabled');
    await signIn(inputData, {
      onSuccess: () => {
        router.replace(loginAuth ? '/form' : '/dashboard');
      },
      onError: (error) => {
        // eslint-disable-next-line no-alert
        alert(`ログインに失敗しました。\n ${error.message}`);
        setSubmitButton('primary');
      },
    });
  };

  return (
    <div className={'w-100  h-200 m-10 text-center'}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
