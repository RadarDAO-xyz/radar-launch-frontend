import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export function Placeholder({ children }: Props) {
  return (
    <section className="mx-auto flex h-[calc(100vh-400px)] max-w-screen-lg items-center justify-center">
      {children}
    </section>
  );
}
