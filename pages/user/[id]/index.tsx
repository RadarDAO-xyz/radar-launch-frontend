import dynamic from "next/dynamic";

const UpdateFormNoSSR = dynamic(
  () =>
    import("@/components/ProfilePage/UpdateForm").then((mod) => mod.UpdateForm),
  { ssr: false }
);

export default function ProfilePage() {
  return <UpdateFormNoSSR />;
}
