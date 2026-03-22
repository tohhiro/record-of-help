'use client';

import ErrorPage from '@/app/components/ErrorPage';

export default function AppError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  if (process.env.NODE_ENV !== 'production') {
    return <ErrorPage error={error} reset={reset} />;
  }

  // eslint-disable-next-line no-console
  console.error(error);

  const genericError = new Error(
    'エラーが発生しました。時間をおいて再度お試しください。',
  );

  return <ErrorPage error={genericError} reset={reset} />;
}
