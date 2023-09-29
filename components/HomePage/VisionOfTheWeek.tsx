import { CONTRACT_ADDRESS } from '@/constants/address';
import { useGetCountdown } from '@/hooks/useGetCountdown';
import { useRadarEditionsGetEditions } from '@/lib/generated';
import { cn } from '@/lib/utils';
import { Project, ProjectStatus } from '@/types/mongo';
import Link from 'next/link';
import { HTMLParsedComponent } from '../Layout/HTMLParsedComponent';
import { ProjectVideoPlayer } from '../Layout/ProjectVideoPlayer';
import { chains } from '../Providers/Web3Provider';
import { BelieveProjectDialog } from './BelieveProjectDialog';

export function VisionOfTheWeek(props: Project) {
  const { _id, mint_end_date, tags, video_url, title, description, status } =
    props;
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });
  const editionId = onChainProjects?.findIndex((project) => project.id === _id);
  // const { data: totalSupply } = useRadarEditionsTotalSupply({
  //   address: CONTRACT_ADDRESS,
  //   chainId: chains[0]?.id,
  //   args: [BigInt(Math.max(editionId || 0, 0))],
  //   enabled: Boolean(chains[0]?.id) && editionId !== undefined,
  // });
  const countdown = useGetCountdown(
    mint_end_date ? new Date(mint_end_date) : undefined,
  );

  return (
    <div className="featured-project-wrapper">
      <p className="mobile-subtitle">{'Featured Project'}</p>
      <div className="floating-weekly-featured full !bg-gray-600/30">
        {'✨ LAUNCH OF THE WEEK ✨'}
      </div>
      <div className={cn('w-full')}>
        <ProjectVideoPlayer videoUrl={video_url} />
      </div>
      <div className="feature-project-div">
        <div className="text-x flex justify-end gap-2 divide-x-2 overflow-x-auto pt-3 scrollbar-hide">
          {tags.map((tag) => (
            <p key={tag} className="py-2 [&:not(:first-child)]:pl-2">
              {tag.toUpperCase()}
            </p>
          ))}
        </div>
        <div className="_20px-div" />
        <Link
          className="link-block-3 transition-opacity hover:opacity-70"
          href={`/project/${_id}`}
        >
          <div className="div-block-97">
            <p className="featured-project-title font-bolded text-2xl leading-7">
              {title || 'FUTURES DROP #1'}
            </p>
          </div>
        </Link>
        <div>
          {description && (
            <HTMLParsedComponent
              className="pb-4 text-xs text-gray-700"
              text={description}
            />
          )}
          <div className="_10px-div" />
          <div className="collect-wrapper main bottom-1 w-full gap-4 md:bottom-[5%]">
            <div className="flex-1">
              {status === ProjectStatus.LIVE ? (
                <BelieveProjectDialog
                  {...props}
                  editionId={editionId !== -1 ? editionId : undefined}
                  buttonProps={{
                    className: 'text-lg',
                  }}
                />
              ) : (
                // {/* {mint_end_date ? (
                //     <span className="border-r pr-3">{countdown}</span>
                //   ) : null}
                //   <span>
                //     {(
                //       (totalSupply || 0n) + BigInt(supporter_count || 0)
                //     ).toString()}{' '}
                //     supporters
                //   </span> */}
                <div>{countdown} until drop</div>
              )}
            </div>
            <Link
              className={cn(
                'flex items-center text-lg transition-opacity hover:opacity-60',
                status === ProjectStatus.LIVE
                  ? 'cursor-pointer'
                  : 'cursor-none',
              )}
              href={`/project/${_id}`}
            >
              <span className="whitespace-pre">READ MORE </span>
              <span className="arrow-diagonal ml-0 text-2xl">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
