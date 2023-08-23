import { AdminNav } from '@/components/Layout/AdminNav';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import dynamic from 'next/dynamic';

const UpdateFormNoSSR = dynamic(
  () =>
    import('@/components/ProfilePage/UpdateForm').then((mod) => mod.UpdateForm),
  { ssr: false },
);

export default function ProfilePage() {
  const { data } = useGetCurrentUser();
  const { idToken } = useAuth();

  if (!idToken || !data) {
    return (
      <section className="flex min-h-[calc(100vh-100px)] items-center justify-center px-[5%] py-12">
        <h1>Please login</h1>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-[80px] max-w-screen-lg px-[5%]">
      <AdminNav isUpdateProfile user={data} />
      <UpdateFormNoSSR />
    </section>
  );
}
