import { CreatePoolForm } from '@/components/CreatePoolPage/CreatePoolForm';
import { Placeholder } from '@/components/common/Placeholder';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
export default function CreatePoolPage() {
  const { data } = useGetCurrentUser();
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

  return (
    <section className="mx-auto mt-24 max-w-screen-lg">
      <CreatePoolForm {...data} />
    </section>
  );
}
