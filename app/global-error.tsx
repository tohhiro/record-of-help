'use client';

import './styles/globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <html lang="ja">
      <body>
        <div>
          <p>pageのError</p>
          <p>エラーが発生しました。時間をおいて再度お試しください。</p>
          <button type="button" onClick={reset}>
            もう一度試す
          </button>
        </div>
      </body>
    </html>
  );
}
