import dynamic from 'next/dynamic';

const CreateFormNoSSR = dynamic(
  () =>
    import('@/components/CreateProjectPage/CreateForm').then(
      (mod) => mod.CreateForm,
    ),
  { ssr: false },
);

export default function CreateProjectPage() {
  return <CreateFormNoSSR />;
}
