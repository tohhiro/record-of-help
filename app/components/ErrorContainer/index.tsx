import { PropsWithChildren } from 'react';

export const ErrorContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <p className="text-xs text-red-500">{children}</p>
);
