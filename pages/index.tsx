import {
  Banner,
  FundingPoolsHome,
  HeaderHero,
  InspirationFooter,
  PreLaunchFooter,
  VisionOfTheWeekProject,
} from "@/devlink";
import dynamic from "next/dynamic";
import { ProjectBlock } from "@/components/ProjectBlock";

const NavBarWithNoSSR = dynamic(
  () => import("@/devlink/NavBar").then((res) => res.NavBar),
  { ssr: false }
);

const ProjectDivWithNoSSR = dynamic(
  () => import("@/components/ProjectDiv").then((res) => res.ProjectDiv),
  { ssr: false }
);

const HomePage = () => {
  return (
    <div>
      <NavBarWithNoSSR />
      <Banner />
      <HeaderHero visionOfTheWeekSlot={<VisionOfTheWeekProject />} />
      <ProjectDivWithNoSSR
        projectSectionName="August"
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
        projectSectionName="July"
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
      <PreLaunchFooter />
    </div>
  );
};

export default HomePage;
