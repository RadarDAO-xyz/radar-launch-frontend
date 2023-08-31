import { Placeholder } from '@/components/Layout/Placeholder';
import { PoolProjectHeader } from '@/components/PoolPage/PoolProjectHeader';
import { ProjectSection } from '@/components/PoolPage/ProjectSection';
import { ReadyToLaunchComponent } from '@/components/PoolPage/ReadyToLaunchComponent';
import { useGetPool } from '@/hooks/useGetPool';
import { useRouter } from 'next/router';

export default function PoolPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetPool(id?.toString());

  if (isLoading) {
    return (
      <Placeholder>
        <h1>Loading...</h1>
      </Placeholder>
    );
  }

  if (!id || !data) {
    return (
      <Placeholder>
        <h1>No Pool Found</h1>
      </Placeholder>
    );
  }

  return (
    <>
      <PoolProjectHeader {...data} />
      <ProjectSection {...data} />
      <ReadyToLaunchComponent />
    </>
  );
}
