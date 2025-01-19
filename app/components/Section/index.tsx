import { PropsWithChildren } from 'react';

export const Section: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="w-80 my-4 m-auto">{children}</div>
);
