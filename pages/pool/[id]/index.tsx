import { FundingPoolProjectHeader } from '@/devlink'
import dynamic from "next/dynamic";
import { ProjectBlock } from "@/components/ProjectBlock";

const ProjectDivWithNoSSR = dynamic(
    () => import("@/components/ProjectDiv").then((res) => res.ProjectDiv),
    { ssr: false }
  );

export default function PoolPage({ params }: { params: { slug: string } }) {
    return(
        <>
            <FundingPoolProjectHeader />
        </>
         
    )
}