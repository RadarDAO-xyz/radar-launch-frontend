import { _Builtin } from "@/devlink";
import React from "react";

interface ProjectDivProps {
  projects: React.ReactNode;
  curator: React.ReactNode;
  projectSectionName?: string;
  projectSectionTitle?: string;
  projectSectionDescription?: string;
  showCreateProjectButton?: boolean;
}

export function ProjectDiv({
  projects,
  projectSectionName,
  projectSectionDescription,
  projectSectionTitle,
  showCreateProjectButton,
  curator,
}: ProjectDivProps) {
  return (
    <section className="bg-white px-[5%] pt-12">
      <div className="title-block">
        {projectSectionTitle && (
          <h1 className="heading-trending-launch-page">
            {projectSectionTitle}
          </h1>
        )}
        <div className="_10px-div" />
        {projectSectionDescription && (
          <div className="div-block-103">
            <p className="body-text left">
              {"every month we invite a guest curator to support 4 projects"}
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
            {projectSectionName} curated by
            <br />
          </p>
          {curator}
        </div>
      </div>
    </section>
  );
}
