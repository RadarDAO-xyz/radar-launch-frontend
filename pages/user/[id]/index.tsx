import { AdminNav } from "@/components/AdminNav";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import dynamic from "next/dynamic";

const UpdateFormNoSSR = dynamic(
  () =>
    import("@/components/ProfilePage/UpdateForm").then((mod) => mod.UpdateForm),
  { ssr: false }
);

export default function ProfilePage() {
  const { data } = useGetCurrentUser();

  return (
    <section className="max-w-screen-lg mx-auto mt-[80px]">
      <AdminNav isUpdateProfile user={data} />
      <UpdateFormNoSSR />
    </section>
  );
}
