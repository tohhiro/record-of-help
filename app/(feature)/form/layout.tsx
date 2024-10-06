import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Record of Help | Form',
  description: 'This App is recording help by your children',
};

export default function FormLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
