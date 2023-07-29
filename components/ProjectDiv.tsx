import { _Builtin } from "@/devlink";
import React from "react";

interface ProjectDivProps {
  projects: React.ReactNode;
  curator: React.ReactNode;
  projectSectionCurationName?: string;
  projectSectionTitle?: string;
  projectSectionDescription?: string;
  showCreateProjectButton?: boolean;
}

export function ProjectDiv({
  projects,
  projectSectionCurationName,
  projectSectionDescription,
  projectSectionTitle,
  showCreateProjectButton,
  curator,
}: ProjectDivProps) {
  return (
    <section className="bg-white px-[5%] pt-12">
      <div className="title-block">
        {projectSectionTitle && (
          <h2 className="heading-trending-launch-page">
            {projectSectionTitle}
          </h2>
        )}
        <div className="_10px-div" />
        {projectSectionDescription && (
          <div className="div-block-103">
            <p className="body-text left">
              {projectSectionDescription}
              <br />
            </p>
            {showCreateProjectButton && (
              <div className="subbutton no-share">
                <div className="small-text">
                  {"become a curator "}
                  <span className="arrow-diagonal">{"↗"}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="month-curated">
        <div className="flex overflow-auto ">{projects}</div>
        <div className="div-block-101 top">
          <p className="curator-text">
            {projectSectionCurationName} curated by
            <br />
          </p>
          {curator}
        </div>
      </div>
    </section>
  );
}
