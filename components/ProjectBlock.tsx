import { cn } from "@/lib/utils";
import Link from "next/link";
import HoverVideoPlayer from "react-hover-video-player";
import { getCountdown } from "../lib/utils";
import { Project, ProjectStatus } from "@/types/mongo";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";
import { generateVideoEmbed } from "@/lib/generateVideoEmbed";
import { generateHoverVideoLink } from "@/lib/generateHoverVideoLink";
import { DotIcon } from "lucide-react";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import {
  useRadarEditionsGetEditions,
  useRadarEditionsTotalSupply,
} from "@/lib/generated";
import isTestnet from "@/lib/isTestnet";
import { chains } from "./Web3Provider";

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

  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });
  const editionId: number | undefined = onChainProjects?.findIndex(
    (project) => project.id === _id
  );
  const value =
    editionId !== undefined ? onChainProjects?.[editionId]?.fee : undefined;

  const { data: totalSupply } = useRadarEditionsTotalSupply({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [BigInt(Math.max(editionId!, 0))],
    enabled: Boolean(chains[0]?.id) && editionId !== undefined,
  });

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
            <p className="project-title uppercase leading-4 font-bolded">
              {title}
            </p>
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
          <div className="pt-2 flex border-t w-full border-t-[var(--line-83d2b2f6)] items-center">
            {status === ProjectStatus.LIVE ? (
              <div className="text-center w-full flex justify-between text-xs text-gray-700">
                {mint_end_date ? (
                  <p>{getCountdown(new Date(mint_end_date))}</p>
                ) : null}
                {totalSupply !== undefined && (
                  <p>{totalSupply.toString()} collected</p>
                )}
              </div>
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
