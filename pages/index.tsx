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
import Link from "next/link";

export default function HomePage() {
  const { data } = useGetProjects();

  return (
    <div className="mt-[80px]">
      {/* <Banner /> */}
      <HeaderHero visionOfTheWeekSlot={<VisionOfTheWeekProject />} />
      <ProjectDiv
        projectSectionTitle="CURATED VISIONS"
        projectSectionDescription="every month we invite a guest curator to support 4 projects"
        showCreateProjectButton
        curatorSection={
          <Link
            href="https://www.culture3.xyz/"
            target="_blank"
            className="flex"
          >
            <p className="curator-text">
              august curated by
              <br />
            </p>
            <img
              className="logo"
              loading="lazy"
              width={56}
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a6a82851e7ea1f12599225_62c421c68db31c451cbecc30_c3full_off_black.svg"
            />
            <div className="arrow-diagonal">{"↗"}</div>
          </Link>
        }
        projects={
          <>
            {data
              // ?.filter(
              //   (project) =>
              //     project?.curation?.start &&
              //     new Date(project.curation.start) > new Date()
              // )
              ?.map((project) => (
                <ProjectBlock
                  key={project._id.toString()}
                  id={project._id.toString()}
                  briefName={project.brief}
                  projectByline={project.description}
                  projectTitle={project.title}
                  supporters={project.supporter_count}
                  projectDate={new Date(project.mint_end_date)}
                  isDisabled={project.status !== ProjectStatus.LIVE}
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
