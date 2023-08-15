import { FundingPoolHome } from "@/components/PoolPage/FundingPoolHome";
import { HeaderHero } from "@/components/HomePage/HeaderHero";
import { InspirationFooter } from "@/components/HomePage/InspirationFooter";
import { Banner } from "@/components/Layout/Banner";
import { ProjectDiv } from "@/components/HomePage/ProjectDiv";
import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/hooks/useGetProjects";
import dynamic from "next/dynamic";
import Link from "next/link";

const ProjectBlockNoSSR = dynamic(
  () =>
    import("@/components/Layout/ProjectBlock").then((res) => res.ProjectBlock),
  {
    ssr: false,
  }
);

const VisionOfTheWeekProjectNoSSR = dynamic(
  () =>
    import("@/components/HomePage/VisionOfTheWeek").then(
      (res) => res.VisionOfTheWeek
    ),
  {
    ssr: false,
  }
);

const CENTAUR_PROEJCT_IDS = [
  "64d3ef19d96faeddac76d82b",
  "64d3f328d96faeddac76d848",
  "64d3f928d96faeddac76d86d",
  "64d3fbece93b67e1d4e27671",
];

export default function HomePage() {
  const { data } = useGetProjects();

  return (
    <section>
      <div className="absolute w-screen top-[100px] left-0 text-[200px] leading-none whitespace-nowrap font-bold text-gray-100 z-10 font-bolded overflow-hidden">
        A MORE PLAYFUL FUTURE
      </div>

      <HeaderHero
        visionOfTheWeekSlot={
          <VisionOfTheWeekProjectNoSSR
            projectId={process.env.FEATURED_PROJECT_ID!}
          />
        }
      />
      <ProjectDiv
        projectSectionTitle="CURATED VISIONS"
        projectSectionDescription="Every month we invite a guest curator to spotlight 4 projects building a better future"
        projectSectionButton={
          <Button className="font-bold font-bolded" variant={"ghost"} asChild>
            <Link href="https://t.me/+e97ms5e1fvJiMjhk" target="_blank">
              {"GET DROP UPDATES"}
            </Link>
          </Button>
        }
        projects={
          <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
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
                <ProjectBlockNoSSR
                  key={project._id}
                  {...project}
                  showMintEndDate
                  showSupporters
                />
              ))}
          </div>
        }
      />
      <ProjectDiv
        projectSectionTitle="OUR CENTAUR FUTURE"
        projectSectionDescription="Support over 10 weeks of collective discovery, exploration and innovation in Cycle #3"
        projectSectionButton={
          <Button className="font-bold font-bolded" variant={"ghost"} asChild>
            <Link href="https://www.radardao.xyz/patron" target="_blank">
              {"READ MORE"}
            </Link>
          </Button>
        }
        projects={
          <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
            {data
              ?.filter((project) => CENTAUR_PROEJCT_IDS.includes(project._id))
              .sort((a, b) => a.edition_price - b.edition_price)
              .map((project) => (
                <ProjectBlockNoSSR key={project._id} {...project} showPrice />
              ))}
          </div>
        }
      />
      <FundingPoolHome />
      <InspirationFooter />
    </section>
  );
}
