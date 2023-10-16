import { Placeholder } from '@/components/common/Placeholder';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetProject } from '@/hooks/useGetProject';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { HelpCircleIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditFormNoSSR = dynamic(
  () =>
    import('@/components/EditProjectPage/EditForm').then((mod) => mod.EditForm),
  { ssr: false },
);

export default function EditProjectPage() {
  const { data: userData } = useGetCurrentUser();
  const { idToken } = useAuth();
  const { wallet } = usePrivyWagmi();
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetProject(id?.toString());

  if (idToken === '' || userData === undefined) {
    return (
      <Placeholder>
        <h1>Please login</h1>
      </Placeholder>
    );
  }

  if (!id || data === undefined) {
    return (
      <Placeholder>
        <h1>No project found</h1>
      </Placeholder>
    );
  }

  if (
    data?.admin_address.toUpperCase() !== wallet?.address?.toUpperCase() &&
    !userData.bypasser
  ) {
    return (
      <Placeholder>
        <h1>Not Authorized to Edit</h1>
      </Placeholder>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-[5%]">
      <Alert className="mb-6 mt-12 items-center">
        <HelpCircleIcon className="h-5 w-5" />
        <AlertTitle className="border-none">
          Having Trouble Updating?
        </AlertTitle>
        <AlertDescription>
          Reach out to{' '}
          <Link href="mailto:launch@radardao.xyz" className="hover:underline">
            launch@radardao.xyz
          </Link>{' '}
          for support.
        </AlertDescription>
      </Alert>
      <EditFormNoSSR {...data} />
    </div>
  );
}
