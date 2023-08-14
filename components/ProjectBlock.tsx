import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { generateVideoEmbed } from "@/lib/generateVideoEmbed";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";
import {
  useRadarEditionsGetEditions,
  useRadarEditionsTotalSupply,
} from "@/lib/generated";
import isTestnet from "@/lib/isTestnet";
import { isValidVideoLink } from "@/lib/isValidVideoLink";
import { cn } from "@/lib/utils";
import { Project, ProjectStatus } from "@/types/mongo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCountdown } from "../lib/utils";
import { chains } from "./Web3Provider";
import { Button } from "./ui/button";

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

interface Props extends Project {
  showDropDate?: boolean;
  showMintEndDate?: boolean;
  showPrice?: boolean;
  showSupporters?: boolean;
}

export function ProjectBlock({
  _id,
  status,
  video_url,
  title,
  mint_end_date,
  supporter_count,
  brief,
  edition_price,
  showDropDate,
  showMintEndDate,
  showPrice,
  showSupporters,
}: Props) {
  const isDisabled = status !== ProjectStatus.LIVE;
  const router = useRouter();

  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });
  const editionId: number | undefined = onChainProjects?.findIndex(
    (project) => project.id === _id
  );
  const { data: totalSupply } = useRadarEditionsTotalSupply({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [BigInt(Math.max(editionId! || 0, 0))],
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
          <div className={cn("text-xs", isDisabled ? "text-gray-500" : "")}>
            {isDisabled ? "LOADING" : brief}
          </div>
        </div>
        <div className="_10px-div" />
        <div className="project-image w-full">
          {isValidVideoLink(video_url) ? (
            <iframe
              frameBorder={0}
              src={generateVideoEmbed(
                video_url,
                video_url.startsWith("https://www.youtube")
                  ? "?controls=0&fs=0&loop=1&modestbranding=1&playsinline=1&iv_load_policy=3"
                  : "?title=0&byline=0&portrait=0&sidedock=0&loop=1"
              )}
              className="aspect-video w-full"
              allow="autoplay; fullscreen; picture-in-picture"
            />
          ) : (
            <img src={generateVideoThumbnail(video_url)} className="w-full" />
            // <HoverVideoPlayer
            //   focused
            //   loop
            //   videoSrc={generateHoverVideoLink(video_url)}
            //   className="!hidden md:!inline-block"
            // />
          )}
        </div>
        <div className="_20px-div" />
        <Link
          className={cn(
            "project-copy transition-opacity mb-1",
            isDisabled ? "pointer-events-none" : "hover:opacity-70"
          )}
          href={`/project/${_id}`}
        >
          <p className="project-title pb-0 uppercase leading-4 font-bolded">
            {title}
          </p>
        </Link>
        {showDropDate && (
          <div className="featured-project-bio mb-2">
            <p className="project-byline">
              {/* TODO: change to launch_date */}
              {formatDate(new Date(mint_end_date))}
            </p>
          </div>
        )}
      </div>
      <div className="bottom-half-of-content">
        <div className="collect-wrapper flex-row">
          <div className="pt-3 flex border-t w-full border-t-[var(--line-83d2b2f6)] items-center justify-between">
            <div>
              {status === ProjectStatus.LIVE ? (
                <div className="text-center w-full flex text-xs text-gray-700 divide-x">
                  {showMintEndDate && mint_end_date && (
                    <p className="pr-2">
                      {getCountdown(new Date(mint_end_date))}
                    </p>
                  )}
                  {/* TODO: change this to onchain fee / exchange rate */}
                  {showPrice && (
                    <p className="pr-2">
                      $
                      {edition_price.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      USD
                    </p>
                  )}
                  {showSupporters && totalSupply !== undefined && (
                    <p className="pl-2">
                      {(totalSupply + BigInt(supporter_count || 0)).toString()}{" "}
                      supporters
                    </p>
                  )}
                </div>
              ) : (
                <div className="count-block flex items-center justify-center">
                  {getCountdown(new Date(mint_end_date))} until drop
                </div>
              )}
            </div>
            <Button
              onClick={() => router.push(`/project/${_id}`)}
              className="arrow-diagonal text-xl cursor-pointer hover:opacity-60 transition-opacity bg-transparent text-black hover:bg-transparent disabled:opacity-40 px-1 h-4"
              disabled={
                status === ProjectStatus.IN_REVIEW ||
                status === ProjectStatus.APPROVED
              }
            >
              {"↗"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
