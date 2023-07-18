import {
  Banner,
  FundingPoolsHome,
  HeaderHero,
  InspirationFooter,
  PreLaunchFooter,
  ProjectBlock,
  VisionOfTheWeekProject,
} from "@/devlink";
import dynamic from "next/dynamic";

const NavBarWithNoSSR = dynamic(
  () => import("@/devlink/NavBar").then((res) => res.NavBar),
  { ssr: false }
);

const ProjectDivWithNoSSR = dynamic(
  () => import("@/devlink/ProjectDiv").then((res) => res.ProjectDiv),
  { ssr: false }
);

const HomePage = () => {
  return (
    <div>
      <NavBarWithNoSSR />
      <Banner />
      <HeaderHero visionOfTheWeekSlot={<VisionOfTheWeekProject />} />
      <ProjectDivWithNoSSR
        allProjectsWrapperSlotWeek2={
          <>
            <ProjectBlock />
            <ProjectBlock />
            <ProjectBlock />
            <ProjectBlock />
            <ProjectBlock />
            <ProjectBlock />
          </>
        }
        allprojectswrapperSlotweek1={<ProjectBlock />}
      />
      <FundingPoolsHome />
      <InspirationFooter />
      <PreLaunchFooter />
    </div>
  );
};

export default HomePage;
