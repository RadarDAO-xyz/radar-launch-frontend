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
import dynamic from "next/dynamic";

const ProjectBlockNoSSR = dynamic(
  () => import("@/components/ProjectBlock").then((res) => res.ProjectBlock),
  {
    ssr: false,
  }
);

const FEATURED_PROJECT_ID = "64cc1fdaa7c27d4528c2ca00";

export default function HomePage() {
  const { data } = useGetProjects();

  console.log({ data });

  return (
    <section className="mt-[80px]">
      <div className="absolute w-screen top-[64px] left-0 text-[200px] leading-none whitespace-nowrap font-bold text-gray-100 z-10 font-bolded overflow-hidden">
        A MORE PLAYFUL FUTURE
      </div>

      {/* <Banner /> */}
      <HeaderHero
        visionOfTheWeekSlot={
          <VisionOfTheWeekProject projectId={FEATURED_PROJECT_ID} />
        }
      />
      <ProjectDiv
        projectSectionTitle="CURATED VISIONS"
        projectSectionDescription="Every month we invite a guest curator to spotlight 4 projects building a better future"
        showCreateProjectButton
        projects={
          <div className="flex flex-col md:flex-row w-full overflow-auto md:space-x-12">
            {data
              ?.slice(0, 4)
              // ?.filter(
              //   (project) =>
              //     project?.curation?.start &&
              //     new Date(project.curation.start) > new Date()
              // )
              ?.map((project) => (
                <ProjectBlockNoSSR
                  key={project._id.toString()}
                  id={project._id.toString()}
                  briefName={project.brief}
                  projectByline={project.description}
                  projectTitle={project.title}
                  supporters={project.supporter_count}
                  projectDate={new Date(project.mint_end_date)}
                  videoUrl={project.video_url}
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
