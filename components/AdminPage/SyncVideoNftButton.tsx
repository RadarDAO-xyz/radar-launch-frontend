import {
  usePrepareRadarVideoNftMint,
  useRadarVideoNftMint,
} from '@/lib/generated';
import { Button } from '../ui/button';
import { VIDEO_CONTRACT_ADDRESS } from '@/constants/address';
import { chains } from '../Providers/Web3Provider';
import { useAccount } from 'wagmi';
import { useUpdateAsset } from '@livepeer/react';
import { Project } from '@/types/mongo';
import { ProjectWithChainData } from '@/types/web3';
import { generateVideoThumbnail } from '@/lib/generateVideoThumbnail';
import TurndownService from 'turndown';
import { useEffect } from 'react';

const turndownService = new TurndownService();

export function SyncVideoNftButton({
  video_id,
  title,
  thumbnail,
  _id,
  description,
  video_url,
}: ProjectWithChainData) {
  const { data, mutate } = useUpdateAsset({
    assetId: video_id!,
    name: title,
    storage: {
      metadata: {
        name: title,
        image: thumbnail || generateVideoThumbnail(video_url),
        description: turndownService.turndown(
          `<p>${title}</p>${description}<p>Building A More Play-Full Future on Launch</p>`,
        ),
        external_url: `https://radarlaunch.app/project/${_id}`,
      },
    },
  });

  useEffect(() => {
    if (data) {
      console.log('sync video', data);
    }
  }, [data]);

  return (
    <Button
      onClick={() => {
        mutate?.();
      }}
      disabled={mutate === undefined || video_id === undefined}
    >
      Sync Project Metadata
    </Button>
  );
}
