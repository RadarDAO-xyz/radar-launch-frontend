import { generateHoverVideoLink } from '@/lib/generateHoverVideoLink';
import { generateVideoEmbed } from '@/lib/generateVideoEmbed';
import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  videoUrl?: string;
  videoClassName?: string;
}

export function ProjectVideo({
  videoUrl,
  className,
  videoClassName,
  ...props
}: Props) {
  return (
    <div {...props} className={cn('w-full', className)} key={videoUrl}>
      {videoUrl?.startsWith('https://') ? (
        <iframe
          src={generateVideoEmbed(
            videoUrl,
            videoUrl.includes('vimeo')
              ? '?title=0&byline=0&portrait=0&sidedock=0&loop=1'
              : '',
          )}
          className={cn('aspect-video w-full', videoClassName)}
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <HoverVideoPlayer
          focused
          loop
          videoSrc={videoUrl ? generateHoverVideoLink(videoUrl) : '/RL1.mp4'}
          className={cn('!hidden md:!inline-block', videoClassName)}
        />
      )}
    </div>
  );
}
