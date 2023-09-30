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
import { useState } from 'react';
import { DialogFooter } from '../ui/dialog';
import { MintVideoNftButton } from './MintVideoNftButton';
import { SyncVideoNftButton } from './SyncVideoNftButton';

export function ProjectVideoDialog(props: ProjectWithChainData) {
  const { video_id } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useAsset({ assetId: video_id });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Video Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Video settings</DialogTitle>
        <DialogDescription className="space-y-4">
          <Label>Data</Label>
          <p>{JSON.stringify(data, null, 2)}</p>
        </DialogDescription>
        <DialogFooter className="flex !flex-col !space-x-0 space-y-4">
          <SyncVideoNftButton {...props} />
          <MintVideoNftButton videoId={video_id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
