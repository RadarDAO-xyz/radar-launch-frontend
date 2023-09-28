import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { updateProject } from '@/lib/backend';
import { cn } from '@/lib/utils';
import { ProjectWithChainData } from '@/types/web3';
import { ProjectStatus } from '@/types/mongo';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'wagmi';
import { DialogFooter } from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { ApproveEditionButton } from './ApproveEditionButton';
import { CreateEditionButton } from './CreateEditionButton';
import { DeleteProjectButton } from './DeleteProjectButton';
import { DisapproveEditionButton } from './DisapproveEditionButton';
import { useAsset } from '@livepeer/react';
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
