import { ReactNode } from 'react';

interface Props {
  projects: ReactNode;
  title: string;
  amount: ReactNode;
  button: ReactNode;
}

export function RewardsContainer({ projects, title, amount, button }: Props) {
  return (
    <div className="rounded-lg border p-8 flex flex-col justify-between">
      <h4 className="font-bolded text-2xl">{title}</h4>
      <div className="grid grid-cols-6 pb-8 h-full">
        <div className="col-span-4 divide-y pt-1">{projects}</div>
        <div className="col-span-2 mt-auto text-right text-2xl font-semibold text-slate-400/80">
          {amount}
        </div>
      </div>
      {button}
    </div>
  );
}
