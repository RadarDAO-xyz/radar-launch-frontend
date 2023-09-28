import { generateVideoEmbed } from '@/lib/generateVideoEmbed';
import { generateVideoThumbnail } from '@/lib/generateVideoThumbnail';
import { isYoutubeOrVimeoVideoLink } from '@/lib/isYoutubeOrVimeoVideoLink';
import { cn } from '@/lib/utils';
import { PlaybackInfo, Player, useLivepeerProvider } from '@livepeer/react';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

interface Props {
  videoUrl: string;
  thumbnail?: string;
  isThumbnail?: boolean;
  videoClassName?: string;
}

export function ProjectVideoPlayer({
  videoUrl,
  thumbnail,
  videoClassName,
  isThumbnail,
}: Props) {
  const { address } = useAccount();
  const provider = useLivepeerProvider();

  if (isYoutubeOrVimeoVideoLink(videoUrl)) {
    if (isThumbnail) {
      const embedOptions = videoUrl.startsWith('https://www.youtube')
        ? '?controls=0&fs=0&loop=1&modestbranding=1&playsinline=1&iv_load_policy=3'
        : '?title=0&byline=0&portrait=0&sidedock=0&loop=1';
      const iframeSrc = generateVideoEmbed(videoUrl, embedOptions);
      return (
        <iframe
          frameBorder={0}
          src={iframeSrc}
          className={cn(
            'aspect-video w-full bg-gray-100 object-cover',
            videoClassName,
          )}
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
        />
      );
    }

    const embedOptions = videoUrl.includes('youtube')
      ? '?controls=0&fs=0&loop=1&modestbranding=1&playsinline=1&iv_load_policy=3'
      : '';
    const iframeSrc = generateVideoEmbed(videoUrl, embedOptions);

    return (
      <iframe
        width={'100%'}
        className={cn('aspect-video', videoClassName)}
        frameBorder={0}
        src={iframeSrc}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded Project Video"
      />
    );
  }

  if (videoUrl.startsWith('ipfs')) {
    const cid = videoUrl.slice('ipfs://'.length);
    return (
      <Player
        playbackId={cid}
        muted={isThumbnail}
        objectFit="cover"
        viewerId={address}
      />
    );
  }

  return (
    <img
      src={thumbnail || generateVideoThumbnail(videoUrl)}
      className={cn('aspect-video w-full bg-gray-100 object-cover')}
      alt="Project image"
      loading="lazy"
    />
    // <HoverVideoPlayer
    //   focused
    //   loop
    //   videoSrc={generateHoverVideoLink(videoUrl)}
    //   className="!hidden md:!inline-block"
    // />
  );
}
