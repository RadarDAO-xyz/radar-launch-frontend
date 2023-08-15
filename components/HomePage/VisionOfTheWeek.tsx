import { CONTRACT_ADDRESS } from "@/constants/address";
import { useGetProject } from "@/hooks/useGetProject";
import { generateHoverVideoLink } from "@/lib/generateHoverVideoLink";
import { generateVideoEmbed } from "@/lib/generateVideoEmbed";
import {
  useRadarEditionsGetEditions,
  useRadarEditionsTotalSupply,
} from "@/lib/generated";
import { cn, getCountdown } from "@/lib/utils";
import { ProjectStatus } from "@/types/mongo";
import Link from "next/link";
import HoverVideoPlayer from "react-hover-video-player";
import { HTMLParsedComponent } from "../Layout/HTMLParsedComponent";
import { chains } from "../Providers/Web3Provider";

interface Props {
  projectId: string;
}

export function VisionOfTheWeek({ projectId }: Props) {
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });
  const editionId = onChainProjects?.findIndex(
    (project) => project.id === projectId
  );
  const { data: totalSupply } = useRadarEditionsTotalSupply({
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [BigInt(Math.max(editionId || 0, 0))],
    enabled: Boolean(chains[0]?.id) && editionId !== undefined,
  });
  const { data } = useGetProject(projectId);

  return (
    <div className="featured-project-wrapper">
      <p className="mobile-subtitle">{"Featured Project"}</p>
      <div className="floating-weekly-featured full !bg-gray-600/30">
        {"✨ DROP OF THE WEEK ✨"}
      </div>
      <div className="project-image">
        {data?.video_url.startsWith("https://") ? (
          <iframe
            src={generateVideoEmbed(
              data.video_url,
              data.video_url.includes("vimeo")
                ? "?title=0&byline=0&portrait=0&sidedock=0&loop=1"
                : ""
            )}
            className="aspect-video w-full"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        ) : (
          <HoverVideoPlayer
            focused
            loop
            videoSrc={
              data?.video_url
                ? generateHoverVideoLink(data.video_url)
                : "/RL1.mp4"
            }
            className="!hidden md:!inline-block"
          />
        )}
      </div>
      <div className="feature-project-div">
        <div className="_20px-div" />
        <Link
          className="link-block-3 hover:opacity-70 transition-opacity"
          href={`/project/${projectId}`}
        >
          <div className="div-block-97">
            <p className="featured-project-title font-bolded text-2xl leading-7">
              {data?.title || "FUTURES DROP #1"}
            </p>
          </div>
        </Link>
        <div className="">
          {data?.description && (
            <HTMLParsedComponent
              className="text-xs text-gray-700"
              text={data.description}
            />
          )}
          <div className="_10px-div" />
          <div className="collect-wrapper main w-full bottom-1 md:bottom-[5%]">
            <div className="text-xs text-gray-400 w-full">
              {data?.status === ProjectStatus.LIVE ? (
                <div className="flex gap-3 text-gray-700 w-full">
                  {data?.mint_end_date ? (
                    <span className="border-r pr-3">
                      {getCountdown(new Date(data.mint_end_date))}
                    </span>
                  ) : null}
                  <span>
                    {(
                      (totalSupply || 0n) + BigInt(data.supporter_count || 0)
                    ).toString()}{" "}
                    supporters
                  </span>
                </div>
              ) : (
                <div>
                  {getCountdown(new Date("2023-08-03T23:00:00+02:00"))} until
                  drop
                </div>
              )}
            </div>
            <Link
              className={cn(
                "arrow-diagonal text-3xl cursor-pointer hover:opacity-60 transition-opacity",
                data?.status
              )}
              href={`/project/${projectId}`}
            >
              ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
