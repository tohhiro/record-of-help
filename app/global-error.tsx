'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="ja">
      <body>
        <div>
          <p>pageのError</p>
          <p>{error.message}</p>
          <button type="button" onClick={reset}>
            もう一度試す
          </button>
        </div>
      </body>
    </html>
  );
}
