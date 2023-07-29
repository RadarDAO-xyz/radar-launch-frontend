import { FundingPoolHome } from "@/components/FundingPoolHome";
import { ProjectBlock } from "@/components/ProjectBlock";
import { ProjectDiv } from "@/components/ProjectDiv";
import {
  HeaderHero,
  InspirationFooter,
  VisionOfTheWeekProject,
} from "@/devlink";
import { useGetProjects } from "@/hooks/useGetProjects";
import { ProjectStatus } from "@/types/mongo";

export default function HomePage() {
  const { data } = useGetProjects();

  return (
    <div className="mt-[80px]">
      {/* <Banner /> */}
      <HeaderHero visionOfTheWeekSlot={<VisionOfTheWeekProject />} />
      <ProjectDiv
        projectSectionCurationName="August"
        projectSectionTitle="CURATED VISIONS"
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
                  isDisabled={project.status === ProjectStatus["IN_REVIEW"]}
                />
              ))}
          </>
        }
      />
      <ProjectDiv
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
                  isDisabled={project.status === ProjectStatus["IN_REVIEW"]}
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
