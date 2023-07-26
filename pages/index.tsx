import { ProjectBlock } from "@/components/ProjectBlock";
import {
  Banner,
  FundingPoolsHome,
  HeaderHero,
  InspirationFooter,
  VisionOfTheWeekProject,
} from "@/devlink";
import dynamic from "next/dynamic";
import { FundingPoolHome } from "@/components/FundingPoolHome";
import { useQuery } from "wagmi";
import { data } from "autoprefixer";
import { Project } from "@/types/mongo";
import { WithId } from "mongodb";

const ProjectDivWithNoSSR = dynamic(
  () => import("@/components/ProjectDiv").then((res) => res.ProjectDiv),
  { ssr: false }
);

async function getProjects() {
  return fetch(`${process.env.BACKEND_URL}/api/getProjects`).then((res) =>
    res.json()
  );
}

export default function HomePage() {
  const { data, error } = useQuery<WithId<Project>[]>(
    ["projects"],
    getProjects
  );
  console.log(data, error);
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
            {data
              ?.filter(
                (project) =>
                  project?.curation?.start &&
                  new Date(project.curation.start) > new Date()
              )
              .map((project) => (
                <ProjectBlock
                  key={project._id.toString()}
                  id={project._id.toString()}
                  briefName={project.brief}
                  projectByline={project.description}
                  projectTitle={project.title}
                  supporters={project.supporter_count}
                  projectDate={new Date(project.mint_end_date)}
                />
              ))}
          </>
        }
      />
      <ProjectDivWithNoSSR
        projectSectionCurationName="July"
        curator={<span>gary sheng</span>}
        projects={
          <>
            {data
              ?.filter(
                (project) =>
                  project?.curation?.start === undefined ||
                  project?.curation?.end === undefined ||
                  new Date(project.curation.end) < new Date()
              )
              .map((project) => (
                <ProjectBlock
                  key={project._id.toString()}
                  id={project._id.toString()}
                  briefName={project.brief}
                  projectByline={project.description}
                  projectTitle={project.title}
                  supporters={project.supporter_count}
                  projectDate={new Date(project.mint_end_date)}
                />
              ))}
          </>
        }
      />
      <FundingPoolHome />
      <InspirationFooter />
    </div>
  );
}
