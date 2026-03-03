'use client';
import React from 'react';

const Error: React.FC<{ error: Error; reset: () => void }> = ({
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

export default Error;
