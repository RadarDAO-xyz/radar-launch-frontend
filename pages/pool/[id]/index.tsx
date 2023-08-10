import { FundingPoolProjectHeader } from "@/components/PoolPage/FundingPoolProjectHeader";
import { ReadyToLaunchComponent } from "@/components/PoolPage/ReadyToLaunchComponent";
import { useGetPool } from "@/hooks/useGetPool";
import { useRouter } from "next/router";

export default function PoolPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useGetPool(id?.toString());

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!id || !data) {
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <h1>No Pool Found</h1>
      </div>
    );
  }

  return (
    <>
      <FundingPoolProjectHeader {...data} />
      <ReadyToLaunchComponent />
    </>
  );
}
