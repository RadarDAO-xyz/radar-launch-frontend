import { FundingPoolHome } from "@/components/FundingPoolHome";
import { FundingPoolTabs } from "@/devlink";

export default function Pools() {
  return (
    <div className="pt-16">
      <FundingPoolHome />
      <FundingPoolTabs />
    </div>
  );
}
