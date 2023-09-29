import { generateVideoThumbnail } from '@/lib/generateVideoThumbnail';
import { cn } from '@/lib/utils';
import { Player } from '@livepeer/react';
import { usePrivy } from '@privy-io/react-auth';

interface Props {
  thumbnail?: string;
  title?: string;
  videoUrl: string;
}

export function ProjectThumbnail({ thumbnail, videoUrl, title }: Props) {
  const { user } = usePrivy();
  if (videoUrl.startsWith('ipfs')) {
    const cid = videoUrl.slice('ipfs://'.length);

    return (
      <Player
        playbackId={cid}
        muted
        objectFit="cover"
        controls={{ hotkeys: false }}
        viewerId={user?.wallet?.address}
      >
        {/* hide video player controls */}
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
