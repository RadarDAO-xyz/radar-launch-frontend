import { FundingPoolHome } from "@/components/FundingPoolHome";
import { ProjectDiv } from "@/components/ProjectDiv";
import { HeaderHero, InspirationFooter } from "@/devlink";
import { useGetProjects } from "@/hooks/useGetProjects";
import dynamic from "next/dynamic";

const ProjectBlockNoSSR = dynamic(
  () => import("@/components/ProjectBlock").then((res) => res.ProjectBlock),
  {
    ssr: false,
  }
);

const VisionOfTheWeekProjectNoSSR = dynamic(
  () =>
    import("@/devlink/VisionOfTheWeekProject").then(
      (res) => res.VisionOfTheWeekProject
    ),
  {
    ssr: false,
  }
);

const FEATURED_PROJECT_ID = "64d10e4fa67c3abf0508808c";

export default function HomePage() {
  const { data } = useGetProjects();

  console.log({
    data,
    asd: data?.filter(
      (project) =>
        project.curation?.start &&
        new Date(project.curation.start) <= new Date() &&
        // if no curation end date, show it indefinitely
        (!project.curation?.end || new Date(project.curation.end) >= new Date())
    ),
  });

  return (
    <section className="mt-[80px]">
      <div className="absolute w-screen top-[64px] left-0 text-[200px] leading-none whitespace-nowrap font-bold text-gray-100 z-10 font-bolded overflow-hidden">
        A MORE PLAYFUL FUTURE
      </div>

      {/* <Banner /> */}
      <HeaderHero
        visionOfTheWeekSlot={
          <VisionOfTheWeekProjectNoSSR projectId={FEATURED_PROJECT_ID} />
        }
      />
      <ProjectDiv
        projectSectionTitle="CURATED VISIONS"
        projectSectionDescription="Every month we invite a guest curator to spotlight 4 projects building a better future"
        showCreateProjectButton
        projects={
          <div className="flex flex-col md:flex-row w-full overflow-auto md:space-x-12">
            {data
              ?.filter(
                (project) =>
                  project.curation?.start &&
                  new Date(project.curation.start) <= new Date() &&
                  // if no curation end date, show it indefinitely
                  (project.curation?.end ||
                    new Date(project.curation.end) >= new Date())
              )
              // sort by ascending start dates
              .sort(
                (a, b) =>
                  new Date(a.curation.start).getTime() -
                  new Date(b.curation.start).getTime()
              )
              .slice(0, 4)
              .map((project) => (
                <ProjectBlockNoSSR key={project._id} {...project} />
              ))}
          </div>
        }
      />
      <FundingPoolHome />
      <InspirationFooter />
    </section>
  );
}
