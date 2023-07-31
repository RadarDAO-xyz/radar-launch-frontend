import { _Builtin } from "@/devlink";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ProjectDivProps {
  projects: React.ReactNode;
  projectSectionTitle?: string;
  projectSectionDescription?: string;
  showCreateProjectButton?: boolean;
  curatorSection?: ReactNode;
}

export function ProjectDiv({
  projects,
  projectSectionDescription,
  projectSectionTitle,
  showCreateProjectButton,
  curatorSection,
}: ProjectDivProps) {
  return (
    <section className="bg-white px-[5%] pt-12 pb-20 border-b border-b-black">
      <div className="title-block">
        {projectSectionTitle && (
          <h2 className="heading-trending-launch-page">
            {projectSectionTitle}
          </h2>
        )}
        <div className="_10px-div" />
        {projectSectionDescription && (
          <div className="div-block-103 pb-8">
            <p className="body-text left">
              {projectSectionDescription}
              <br />
            </p>
            {showCreateProjectButton && (
              <Button
                className="font-bold font-bolded"
                variant={"ghost"}
                asChild
              >
                <Link href="https://t.me/+e97ms5e1fvJiMjhk" target="_blank">
                  {"GET DROP UPDATES"}
                </Link>
              </Button>
            )}
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
