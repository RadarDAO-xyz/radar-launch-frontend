import { _Builtin } from "@/devlink";
import { cn } from "@/lib/utils";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import Link from "next/link";

interface ProjectBlockProps {
  id: string;
  briefName: string;
  projectTitle: string;
  projectByline: string;
  supporters: number;
  projectDate: Date;
  isDisabled?: boolean;
}

export function ProjectBlock({
  id,
  briefName,
  isDisabled,
  supporters,
  projectByline,
  projectTitle,
  projectDate,
}: ProjectBlockProps) {
  const daysLeft = differenceInDays(projectDate, new Date());
  const hoursLeft = differenceInHours(projectDate, new Date()) - daysLeft * 24;
  const minutesLeft =
    differenceInMinutes(projectDate, new Date()) -
    daysLeft * 24 * 60 -
    hoursLeft * 60;
  return (
    <div
      className={cn(
        "flex w-auto h-auto min-w-[22%] mr-4 mb-1 flex-col",
        isDisabled ? "opacity-70 cursor-default" : ""
      )}
    >
      <div className="top-half-of-content">
        <div className="brief-wrapper">
          <div className="div-block-102">
            <div className="briefs-labels">{"Brief:"}</div>
            <div className="briefs-labels" fs-cmsfilter-field="brief">
              {briefName}
            </div>
          </div>
        </div>
        <div className="_10px-div" />
        <div className="project-image">
          <div className={cn("video-html", isDisabled ? "cursor-default" : "")}>
            <div className="wrapper">
              <div className="youtube" data-embed="FFvIb1gQYa8">
                <div className="play-button"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="_20px-div" />
        <Link
          className={cn("project-copy", isDisabled ? "cursor-default" : "")}
          href={`/project/${id}`}
        >
          <div className="div-block-96">
            <p className="project-title ">{projectTitle}</p>
            <div className="arrow-diagonal">{"↗"}</div>
          </div>
          <div className="featured-project-bio">
            <p className="project-byline">{projectByline}</p>
          </div>
        </Link>
      </div>
      <div className="bottom-half-of-content">
        <div className="collect-wrapper">
          <div className="data">
            <div className="supporters">
              <div className="amount-of-supporters">{supporters}</div>
              <div className="small-text">{"• Supporters"}</div>
            </div>
            <div className="count-block">
              <div className="count-wrap">
                <div className="count-text">{daysLeft}d</div>
              </div>
              <div className="count-wrap">
                <div className="count-text">{hoursLeft}h</div>
              </div>
              <div className="count-wrap">
                <div className="count-text">{minutesLeft}m</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
