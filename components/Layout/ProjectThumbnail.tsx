import { generateVideoThumbnail } from '@/lib/generateVideoThumbnail';
import { cn } from '@/lib/utils';
import { Player } from '@livepeer/react';
import { usePrivy } from '@privy-io/react-auth';
import { useCallback, useState } from 'react';

interface Props {
  thumbnail?: string;
  title?: string;
  videoUrl: string;
}

export function ProjectThumbnail({ thumbnail, videoUrl, title }: Props) {
  const { user } = usePrivy();
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaElementRef = useCallback(
    (ref: HTMLMediaElement) => {
      ref.onclick = () => {
        if (isPlaying) {
          ref.pause();
          setIsPlaying(false);
          return;
        }
        setIsPlaying(true);
        ref.play();
      };
    },
    [isPlaying],
  );

  if (videoUrl.startsWith('ipfs')) {
    const cid = videoUrl.slice('ipfs://'.length);

    return (
      <Player
        playbackId={cid}
        muted
        objectFit="cover"
        viewerId={user?.wallet?.address}
        mediaElementRef={mediaElementRef}
      >
        {/* div below hides video player controls */}
        <div></div>
      </Player>
    );
  }

  return (
    <img
      src={thumbnail || generateVideoThumbnail(videoUrl)}
      className={cn('aspect-video w-full bg-gray-100 object-cover')}
      alt={title ? title + ' thumbnail' : 'Project thumbnail'}
      loading="lazy"
    />
  );
}
