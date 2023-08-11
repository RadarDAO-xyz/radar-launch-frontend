import { AdminNav } from "@/components/AdminNav";
import { useAuth } from "@/hooks/useAuth";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import dynamic from "next/dynamic";

const UpdateFormNoSSR = dynamic(
  () =>
    import("@/components/ProfilePage/UpdateForm").then((mod) => mod.UpdateForm),
  { ssr: false }
);

export default function ProfilePage() {
  const { data } = useGetCurrentUser();
  const { idToken } = useAuth();
  console.log({ data, idToken });

  if (!idToken || !data) {
    return (
      <section className="px-[5%] py-12 min-h-[calc(100vh-100px)] flex items-center justify-center">
        <h1>Please login</h1>
      </section>
    );
  }

  return (
    <section className="max-w-screen-lg mx-auto mt-[80px]">
      <AdminNav isUpdateProfile user={data} />
      <UpdateFormNoSSR />
    </section>
  );
}
