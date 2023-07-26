import { ProjectBlock } from "@/components/ProjectBlock";
import {
  Banner,
  FundingPoolsHome,
  HeaderHero,
  InspirationFooter,
  VisionOfTheWeekProject,
} from "@/devlink";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import { Project } from "../types/mongo";

const ProjectDivWithNoSSR = dynamic(
  () => import("@/components/ProjectDiv").then((res) => res.ProjectDiv),
  { ssr: false }
);

export const getStaticProps: GetStaticProps<{
  projects: Project[];
}> = async () => {
  const response = await fetch("http://localhost:3000/api/getProjects");
  const projects = await response.json();
  return { props: { projects } };
};

export default function Page({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Banner />
      <HeaderHero visionOfTheWeekSlot={<VisionOfTheWeekProject />} />
      <ProjectDivWithNoSSR
        projectSectionCurationName="August"
        projectSectionTitle="curated visions"
        projectSectionDescription="every month we invite a guest curator to support 4 projects"
        showCreateProjectButton
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
      <ProjectDivWithNoSSR
        projectSectionCurationName="July"
        curator={<span>gary sheng</span>}
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
      <FundingPoolsHome />
      <InspirationFooter />
    </div>
  );
}
