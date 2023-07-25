import { FundingPoolProjectHeader, ProjectDiv } from '@/devlink'
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
            <ProjectDivWithNoSSR
                projectSectionTitle="What if NPCs were autonomous?" 
                curator={
                    <img
                      className="logo"
                      loading="lazy"
                      width={56}
                      height="auto"
                      src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a6a82851e7ea1f12599225_62c421c68db31c451cbecc30_c3full_off_black.svg"
                    />
                  }
                  projects={
                    <>
                      <ProjectBlock
                        briefName="Brief Name"
                        projectByline="Project Brief"
                        projectTitle="Project asd"
                        supporters={100}
                        projectDate={new Date(new Date().getTime() + 1000 * 60 * 60 * 25)}
                        isDisabled
                      />
                      <ProjectBlock
                        briefName="Brief Name"
                        projectByline="Project Brief"
                        projectTitle="Project asd"
                        supporters={100}
                        projectDate={new Date(new Date().getTime() + 1000 * 60 * 60 * 25)}
                      />
                    </>
                  }
            />
        </>
         
    )
}