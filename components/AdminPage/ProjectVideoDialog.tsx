import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ProjectWithChainData } from '@/types/web3';
import { useAsset } from '@livepeer/react';
import { useRef, useState } from 'react';
import { DialogFooter } from '../ui/dialog';
import { MintVideoNftButton } from './MintVideoNftButton';
import { SyncVideoNftButton } from './SyncVideoNftButton';
import { Input } from '../ui/input';
import { CacheKey } from '@/constants/react-query';
import { updateProject } from '@/lib/backend';
import { useMutation, useQueryClient } from 'wagmi';
import { useToast } from '../ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useRadarVideoNftTokenUri } from '@/lib/generated';
import { VIDEO_CONTRACT_ADDRESS } from '@/constants/address';
import { chains } from '@/lib/wagmi';
import { UpdateVideoNftButton } from './UpdateVideoNftButton';

export function ProjectVideoDialog(props: ProjectWithChainData) {
  const { video_id, video_url, _id, editionId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const videoUrlRef = useRef<HTMLInputElement>(null);
  const videoIdRef = useRef<HTMLInputElement>(null);
  const { data: tokenURI } = useRadarVideoNftTokenUri({
    enabled: isOpen && editionId !== undefined && editionId > 0,
    address: VIDEO_CONTRACT_ADDRESS,
    chainId: chains[0].id,
    args: [BigInt(editionId || 0)],
  });
  const [videoTokenUri, setVideoTokenUri] = useState(tokenURI || '');
  const { toast } = useToast();

  const { data } = useAsset({ assetId: video_id });
  const { idToken } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    [
      CacheKey.UDPATE_PROJECT_STATUS,
      _id,
      videoUrlRef.current?.value,
      videoIdRef.current?.value,
    ],
    () =>
      updateProject(
        {
          video_id: videoIdRef.current?.value,
          video_url: videoUrlRef.current?.value,
        },
        _id,
        idToken,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CacheKey.PROJECTS]);
      },
      onError: (e) => {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'An unexpected error occured',
          description: 'Check the console for more information',
        });
      },
    },
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Video Settings</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogTitle>Video settings</DialogTitle>
        <DialogDescription className="space-y-4">
          <Label>Raw Video Data</Label>
          <p className="max-h-[200px] max-w-md overflow-auto whitespace-pre font-mono">
            {JSON.stringify(data, null, 2)}
          </p>
          <Label>Video URL</Label>
          <Input defaultValue={video_url} ref={videoUrlRef} />
          <Label>Video ID</Label>
          <Input defaultValue={video_id || ''} ref={videoIdRef} />
          <Label>On chain video ID</Label>
          <Input
            value={videoTokenUri}
            onChange={(e) => setVideoTokenUri(e.target.value)}
          />
        </DialogDescription>
        <DialogFooter className="grid grid-cols-2 gap-4 sm:space-x-0">
          <Button
            onClick={() => {
              mutate();
            }}
            loading={isLoading}
          >
            Update Video Links
          </Button>
          <SyncVideoNftButton {...props} />
          <MintVideoNftButton videoId={video_id} />
          <UpdateVideoNftButton videoId={editionId} tokenUri={videoTokenUri} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
