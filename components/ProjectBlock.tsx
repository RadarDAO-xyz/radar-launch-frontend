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

// date formatter to convert dates to DD.MM.YYYY format
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

function formatDate(date: Date) {
  return dateFormatter
    .formatToParts(date)
    .map(({ type, value }) => {
      switch (type) {
        case "literal":
          if (value === "/") {
            return ".";
          }
          return value;
        case "day":
        case "month":
        case "year":
          if (value.length < 2) {
            return `0${value}`;
          }
          return value;
        default:
          return value;
      }
    })
    .join("");
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
        "flex h-auto w-full mb-1 flex-col",
        isDisabled ? "opacity-70 cursor-default" : ""
      )}
    >
      <div className="top-half-of-content">
        <div className="brief-wrapper items-center">
          <div className="div-block-102">
            <div className="briefs-labels">{"Brief:"}</div>
            <div className="briefs-labels" fs-cmsfilter-field="brief">
              {briefName}
            </div>
          </div>
          {isDisabled && <div className="text-xs text-gray-500">LOADING</div>}
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
            <p className="project-title font-bolded">{projectTitle}</p>
            <div className="arrow-diagonal">{"↗"}</div>
          </div>
          <div className="featured-project-bio">
            <p className="project-byline">{formatDate(projectDate)}</p>
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
