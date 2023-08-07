import { cn } from "@/lib/utils";
import Link from "next/link";
import HoverVideoPlayer from "react-hover-video-player";
import { getCountdown } from "../lib/utils";
import { Project, ProjectStatus } from "@/types/mongo";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";
import { generateVideoEmbed } from "@/lib/generateVideoEmbed";
import { generateHoverVideoLink } from "@/lib/generateHoverVideoLink";

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
  _id,
  status,
  video_url,
  title,
  mint_end_date,
  supporter_count,
}: Project) {
  const isDisabled = status !== ProjectStatus.LIVE;
  return (
    <div
      className={cn(
        "col-span-1 flex h-auto w-full mb-4 flex-col",
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
        <div className="project-image w-full">
          <HoverVideoPlayer
            focused
            loop
            videoSrc={generateHoverVideoLink(video_url)}
            className="!hidden md:!inline-block"
          />
          <img src={generateVideoThumbnail(video_url)} className="md:hidden" />
        </div>
        <div className="_20px-div" />
        <Link
          className={cn(
            "project-copy",
            isDisabled ? "pointer-events-none" : ""
          )}
          href={`/project/${_id}`}
        >
          <div className="div-block-96">
            <p className="project-title font-bolded">{title}</p>
            <div className="arrow-diagonal">{"↗"}</div>
          </div>
          <div className="featured-project-bio">
            <p className="project-byline">
              {formatDate(new Date(mint_end_date))}
            </p>
          </div>
        </Link>
      </div>
      <div className="bottom-half-of-content">
        <div className="collect-wrapper">
          <div className="data pt-1">
            {supporter_count > 0 ? (
              <>
                <div className="supporters">
                  <div className="amount-of-supporters">{supporter_count}</div>
                  <div className="small-text">{"• Supporters"}</div>
                </div>
                <span>{getCountdown(new Date(mint_end_date))}</span>
              </>
            ) : (
              <div className="count-block flex items-center justify-center">
                {getCountdown(new Date(mint_end_date))} until drop
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
