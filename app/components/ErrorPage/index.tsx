'use client';
import React from 'react';

const ErrorPage: React.FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => {
  return (
    <div>
      <p>pageのError</p>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        もう一度試す
      </button>
    </div>
  );
};

export default ErrorPage;
