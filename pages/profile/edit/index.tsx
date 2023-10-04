import { AdminNav } from '@/components/Layout/AdminNav';
import { Placeholder } from '@/components/Layout/Placeholder';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import dynamic from 'next/dynamic';

const UpdateForm = dynamic(
  () =>
    import('@/components/ProfilePage/UpdateForm').then((mod) => mod.UpdateForm),
  { ssr: false },
);

export default function ProfilePage() {
  const { data } = useGetCurrentUser();
  const { idToken } = useAuth();

  if (!idToken || !data) {
    return (
      <Placeholder>
        <h1>Please login</h1>
      </Placeholder>
    );
  }

  return (
    <section className="container mt-[80px] max-w-7xl pb-12 md:pt-6">
      <AdminNav isUpdateProfile user={data} />
      <UpdateForm />
    </section>
  );
}
