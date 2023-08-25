import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { HelpCircleIcon, RocketIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CreateFormNoSSR = dynamic(
  () =>
    import('@/components/CreateProjectPage/CreateForm').then(
      (mod) => mod.CreateForm,
    ),
  { ssr: false },
);

export default function CreateProjectPage() {
  return (
    <div className="mx-auto max-w-5xl px-[5%]">
      <Alert className="mb-6 mt-12 items-center">
        <HelpCircleIcon className="h-5 w-5" />
        <AlertTitle className="border-none">
          Having Trouble Submitting?
        </AlertTitle>
        <AlertDescription>
          Reach out to{' '}
          <Link href="mailto:launch@radardao.xyz" className='hover:underline'>launch@radardao.xyz</Link> for
          support.
        </AlertDescription>
      </Alert>
      <CreateFormNoSSR />
    </div>
  );
}
