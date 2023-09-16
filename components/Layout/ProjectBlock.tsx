import { CONTRACT_ADDRESS } from '@/constants/address';
import { useGetCountdown } from '@/hooks/useGetCountdown';
import { useGetPools } from '@/hooks/useGetPools';
import { generateVideoEmbed } from '@/lib/generateVideoEmbed';
import { generateVideoThumbnail } from '@/lib/generateVideoThumbnail';
import {
  useRadarEditionsGetEditions,
  useRadarEditionsTotalSupply,
} from '@/lib/generated';
import { isValidVideoLink } from '@/lib/isValidVideoLink';
import { cn } from '@/lib/utils';
import { Project, ProjectStatus } from '@/types/mongo';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BelieveProjectDialog } from '../HomePage/BelieveProjectDIalog';
import { chains } from '../Providers/Web3Provider';
import { Button } from '../ui/button';

interface Props extends Project {
  showDropDate?: boolean;
  showMintEndDate?: boolean;
  showPrice?: boolean;
  showSupporters?: boolean;
  showBelieveButton?: boolean;
}

export function ProjectBlock(props: Props) {
  const {
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
    thumbnail,
    tags,
    pool,
    showBelieveButton,
  } = props;
  const { data: poolsData } = useGetPools();
  const router = useRouter();

  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id),
  });
  const editionId: number | undefined = onChainProjects?.findLastIndex(
    (project) => project.id === _id,
  );
  const { data: totalSupply } = useRadarEditionsTotalSupply({
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [BigInt(Math.max(editionId! || 0, 0))],
    enabled:
      Boolean(chains[0]?.id) && editionId !== undefined && showSupporters,
  });
  const countdown = useGetCountdown(new Date(mint_end_date), showMintEndDate);

  const isDisabled = status !== ProjectStatus.LIVE;
  const projectPool = poolsData?.find((poolData) => poolData._id === pool);

  return (
    <div
      className={cn(
        'col-span-1 mb-4 flex h-auto w-full flex-col border p-4',
        isDisabled ? 'cursor-default opacity-70' : '',
      )}
    >
      <div className="top-half-of-content">
        <div className="brief-wrapper items-center">
          <div className="div-block-102">
            <div className="briefs-labels">{'Brief'}</div>
            {/* <div className="briefs-labels" fs-cmsfilter-field="brief">
            </div> */}
          </div>
          <div className={cn('text-xs', isDisabled ? 'text-gray-500' : '')}>
            {isDisabled
              ? 'LOADING'
              : projectPool !== undefined
              ? projectPool.title
              : brief}
          </div>
        </div>
        <div className="_10px-div" />
        <div className="project-image w-full">
          {isValidVideoLink(video_url) ? (
            <iframe
              frameBorder={0}
              src={generateVideoEmbed(
                video_url,
                video_url.startsWith('https://www.youtube')
                  ? '?controls=0&fs=0&loop=1&modestbranding=1&playsinline=1&iv_load_policy=3'
                  : '?title=0&byline=0&portrait=0&sidedock=0&loop=1',
              )}
              className="aspect-video w-full bg-gray-100 object-cover"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <img
              src={thumbnail || generateVideoThumbnail(video_url)}
              className="aspect-video w-full bg-gray-100 object-cover"
              alt="Project image"
              loading="lazy"
            />
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
            'project-copy mb-1 transition-opacity',
            isDisabled ? 'pointer-events-none' : 'hover:opacity-70',
          )}
          href={`/project/${_id}`}
        >
          <p className="project-title pb-0 font-bolded uppercase leading-4">
            {title}
          </p>
        </Link>
        <div className="flex gap-2 divide-x overflow-x-auto pb-2 pt-3 text-xs scrollbar-hide">
          {tags.map((tag) => (
            <p
              key={tag}
              className="whitespace-pre py-1 tracking-tight [&:not(:first-child)]:pl-2"
            >
              {tag.toUpperCase()}
            </p>
          ))}
        </div>
        {showDropDate && (
          <div className="featured-project-bio mb-2">
            <p className="project-byline">
              {/* TODO: change to launch_date */}
              {format(new Date(mint_end_date), 'dd.MM.yy')}
            </p>
          </div>
        )}
      </div>
      <div className="bottom-half-of-content">
        <div className="collect-wrapper flex-row">
          <div className="flex w-full items-center justify-between border-t border-t-[var(--line-83d2b2f6)] pt-3">
            <div>
              {status === ProjectStatus.LIVE ? (
                <div className="flex w-full divide-x text-center text-xs text-gray-700">
                  {showMintEndDate && mint_end_date && (
                    <p className="pr-2 [&:not(:first-child)]:pl-2">
                      {countdown}
                    </p>
                  )}
                  {/* TODO: change this to onchain fee / exchange rate */}
                  {showPrice && (
                    <p className="pr-2 [&:not(:first-child)]:pl-2">
                      $
                      {edition_price.toLocaleString('en-US', {
                        maximumFractionDigits: 0,
                      })}{' '}
                      USD
                    </p>
                  )}
                  {showSupporters && totalSupply !== undefined && (
                    <p className="pr-2 [&:not(:first-child)]:pl-2">
                      {(totalSupply + BigInt(supporter_count || 0)).toString()}{' '}
                      supporters
                    </p>
                  )}
                  {showBelieveButton && (
                    <BelieveProjectDialog
                      {...props}
                      buttonProps={{
                        className: 'max-w-[200px]',
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="count-block flex items-center justify-center">
                  {countdown !== 'CLOSED'
                    ? `${countdown} until drop`
                    : countdown}
                </div>
              )}
            </div>
            <Button
              onClick={() => router.push(`/project/${_id}`)}
              className="arrow-diagonal h-4 cursor-pointer bg-transparent px-1 text-xl text-black transition-opacity hover:bg-transparent hover:opacity-60 disabled:opacity-40"
              disabled={
                status === ProjectStatus.IN_REVIEW ||
                status === ProjectStatus.APPROVED
              }
            >
              {'↗'}
            </Button>
          </div>
        </div>
        <div className="pt-3"></div>
      </div>
    </div>
  );
}
