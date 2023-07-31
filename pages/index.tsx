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
    <section className="mt-[80px]">
      <div className="absolute w-screen top-[64px] left-0 text-[200px] leading-none whitespace-nowrap font-bold text-gray-100 z-10 font-bolded overflow-hidden">
        A MORE PLAYFUL FUTURE
      </div>
      {/* <Banner /> */}
      <HeaderHero visionOfTheWeekSlot={<VisionOfTheWeekProject />} />
      <ProjectDiv
        projectSectionTitle="CURATED VISIONS"
        projectSectionDescription="Every month we invite a guest curator to spotlight 4 projects building a better future"
        showCreateProjectButton
        projects={
          <div className="flex w-full overflow-auto md:space-x-12 space-x-4">
            {data?.slice(0, 4)
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
          </div>
        }
      />
      <FundingPoolHome />
      <InspirationFooter />
    </section>
  );
}
