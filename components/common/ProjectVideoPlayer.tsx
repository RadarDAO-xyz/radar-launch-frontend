import { generateVideoEmbed } from '@/lib/generateVideoEmbed';
import { isYoutubeOrVimeoVideoLink } from '@/lib/isYoutubeOrVimeoVideoLink';
import { cn } from '@/lib/utils';
import { Player } from '@livepeer/react';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { useState } from 'react';
import { ProjectThumbnail } from './ProjectThumbnail';

interface Props {
  videoUrl: string;
  thumbnail?: string;
  isThumbnail?: boolean;
  videoClassName?: string;
  title?: string;
}

export function ProjectVideoPlayer({
  videoUrl,
  thumbnail,
  videoClassName,
  isThumbnail,
  title,
}: Props) {
  const { wallet } = usePrivyWagmi();
  const [DummyControls, setDummyControls] = useState<JSX.Element | null>(() => (
    <div />
  ));

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
      <div
        onMouseEnter={() => {
          setDummyControls(null);
        }}
        onMouseLeave={() => {
          setDummyControls(() => <div />);
        }}
      >
        <Player
          playbackId={cid}
          muted={isThumbnail}
          objectFit="cover"
          poster={thumbnail?.startsWith('https') ? thumbnail : undefined}
          viewerId={wallet?.address}
          theme={{
            colors: {
              accent: '#fff',
            },
            sizes: {
              thumb: '10px',
              thumbActive: '12px',
              trackActive: '4px',
              trackInactive: '4px',
              iconButtonSize: '36px',
            },
          }}
        >
          {DummyControls}
        </Player>
      </div>
    );
  }

  return (
    <ProjectThumbnail videoUrl={videoUrl} thumbnail={thumbnail} title={title} />
    // <HoverVideoPlayer
    //   focused
    //   loop
    //   videoSrc={generateHoverVideoLink(videoUrl)}
    //   className="!hidden md:!inline-block"
    // />
  );
}
