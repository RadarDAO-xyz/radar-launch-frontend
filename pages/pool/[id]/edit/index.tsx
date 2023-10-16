import { CreatePoolForm } from '@/components/CreatePoolPage/CreatePoolForm';
import { Placeholder } from '@/components/common/Placeholder';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetPool } from '@/hooks/useGetPool';
import { useRouter } from 'next/router';

export default function EditPoolPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetCurrentUser();
  const { data: pool } = useGetPool(id?.toString());
  const { idToken } = useAuth();

  if (!data?.wallets?.[0].address || !idToken) {
    return (
      <Placeholder>
        <h1>Please Login</h1>
      </Placeholder>
    );
  }

  if (!data.bypasser) {
    return (
      <Placeholder>
        <h1>Not authorized to view this page</h1>
      </Placeholder>
    );
  }

  if (!id) {
    return (
      <Placeholder>
        <h1>No pool found</h1>
      </Placeholder>
    );
  }

  return (
    <section className="mx-auto mt-24 max-w-screen-lg">
      <CreatePoolForm isEdit {...pool} />
    </section>
  );
}
