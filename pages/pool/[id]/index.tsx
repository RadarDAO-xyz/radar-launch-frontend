import { FundingPoolProjectHeader } from "@/devlink";
import dynamic from "next/dynamic";

export default function PoolPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <FundingPoolProjectHeader />
    </>
  );
}
