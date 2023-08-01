import { FundingPoolProjectHeader } from "@/devlink";
import { ReadyToLaunchComponent } from "@/devlink/ReadyToLaunchComponent";

export default function PoolPage({ params }: { params: { slug: string } }) {
  return (
    <>
       <FundingPoolProjectHeader />
       <ReadyToLaunchComponent />
    </>
  );
}
