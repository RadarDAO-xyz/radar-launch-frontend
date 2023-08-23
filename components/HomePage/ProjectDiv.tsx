import { ReactNode } from 'react';

interface ProjectDivProps {
  projects: ReactNode;
  projectSectionTitle?: string;
  projectSectionDescription?: string;
  projectSectionButton?: ReactNode;
  curatorSection?: ReactNode;
}

export function ProjectDiv({
  projects,
  projectSectionDescription,
  projectSectionTitle,
  projectSectionButton,
  curatorSection,
}: ProjectDivProps) {
  return (
    <section className="border-b border-b-black bg-white px-[5%] pb-20 pt-12">
      <div className="title-block">
        {projectSectionTitle && (
          <h2 className="heading-trending-launch-page">
            {projectSectionTitle}
          </h2>
        )}
        <div className="_10px-div" />
        {projectSectionDescription && (
          <div className="div-block-103 flex flex-col items-center space-x-0 space-y-4 self-end pb-8 md:flex-row md:space-y-0">
            <p className="body-text left">
              {projectSectionDescription}
              <br />
            </p>
            <div>{projectSectionButton}</div>
          </div>
        )}
      </div>
      <div className="month-curated">
        <div className="w-full">{projects}</div>
        {/* <div className="div-block-101 top">{curatorSection}</div> */}
      </div>
    </section>
  );
}
