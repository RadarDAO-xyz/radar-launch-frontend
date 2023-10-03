import { Placeholder } from '@/components/Layout/Placeholder';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { HelpCircleIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CreateForm = dynamic(
  () =>
    import('@/components/CreateProjectPage/CreateForm').then(
      (mod) => mod.CreateForm,
    ),
  { ssr: false },
);

export default function CreateProjectPage() {
  const { idToken } = useAuth();

  if (idToken === '') {
    return (
      <Placeholder>
        <h1>Please login</h1>
      </Placeholder>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-[5%]">
      <Alert className="mb-6 mt-12 items-center">
        <HelpCircleIcon className="h-5 w-5" />
        <AlertTitle className="border-none">
          Having Trouble Submitting?
        </AlertTitle>
        <AlertDescription>
          Reach out to{' '}
          <Link href="mailto:launch@radardao.xyz" className="hover:underline">
            launch@radardao.xyz
          </Link>{' '}
          for support.
        </AlertDescription>
      </Alert>
      <CreateForm />
    </div>
  );
}
