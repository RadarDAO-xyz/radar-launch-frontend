import { cn } from "@/lib/utils";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import Link from "next/link";
import HoverVideoPlayer from "react-hover-video-player";
import { getCountdown } from '../lib/utils';

interface ProjectBlockProps {
  id: string;
  briefName: string;
  projectTitle: string;
  projectByline: string;
  supporters: number;
  projectDate: Date;
  videoUrl: string;
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
  videoUrl,
  projectByline,
  projectTitle,
  projectDate,
}: ProjectBlockProps) {
  return (
    <div
      className={cn(
        "col-span-1 flex h-auto w-full mb-1 flex-col",
        isDisabled ? "opacity-70 cursor-default" : ""
      )}
    >
      <div className="top-half-of-content">
        <div className="brief-wrapper items-center">
          <div className="div-block-102">
            <div className="briefs-labels">{"Brief"}</div>
            {/* <div className="briefs-labels" fs-cmsfilter-field="brief">
            </div> */}
          </div>
          {isDisabled && <div className="text-xs text-gray-500">LOADING</div>}
        </div>
        <div className="_10px-div" />
        <div className="project-image">
          <HoverVideoPlayer
            videoSrc={videoUrl}
          />
        </div>
        <div className="_20px-div" />
        <Link
          className={cn("project-copy", isDisabled ? "pointer-events-none" : "")}
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
          <div className="data pt-1">
            {supporters > 0 ?
              <>
                <div className="supporters">
                  <div className="amount-of-supporters">{supporters}</div>
                  <div className="small-text">{"• Supporters"}</div>
                </div>
                <span>{getCountdown(projectDate)}</span>
              </> : <div className="count-block flex items-center justify-center">
                {getCountdown(projectDate)}{" "}
                until drop
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
