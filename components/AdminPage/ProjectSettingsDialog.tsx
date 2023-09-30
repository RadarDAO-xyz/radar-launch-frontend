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
import { StopEditionButton } from './StopEditionButton';
import { ResumeEditionButton } from './ResumeEditionButton';

export function ProjectSettingsDialog({
  _id,
  status,
  editionId,
  curation,
  edition_price,
  admin_address,
  pool,
  onChainStatus,
}: ProjectWithChainData) {
  const [isOpen, setIsOpen] = useState(false);

  const { idToken } = useAuth();
  const [projectStatus, setProjectStatus] = useState(status);
  const [curationStart, setCurationStart] = useState<Date | undefined>(
    curation?.start ? new Date(curation.start) : undefined,
  );
  const [curationEnd, setCurationEnd] = useState<Date | undefined>(
    curation?.end ? new Date(curation.end) : undefined,
  );

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isUpdateLoading } = useMutation(
    [CacheKey.UDPATE_PROJECT_STATUS, _id, projectStatus],
    () =>
      updateProject(
        {
          status: projectStatus,
          curation: {
            start: curationStart?.toISOString(),
            end: curationEnd?.toISOString(),
          },
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
        <Button>Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>General Project Settings</DialogTitle>
        <DialogDescription className="space-y-4">
          <Label>New Database Project Status</Label>
          <Select
            onValueChange={(value) => setProjectStatus(+value)}
            defaultValue={projectStatus.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Brief" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(ProjectStatus)
                .filter((value) => !isNaN(+value))
                .map((status) => (
                  <SelectItem key={status} value={status.toString()}>
                    {ProjectStatus[+status]}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Label>Curation Start</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !curationStart && 'text-muted-foreground',
                )}
              >
                {curationStart ? (
                  format(curationStart, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={curationStart}
                onSelect={(e) => {
                  if (e !== undefined) {
                    setCurationStart(e);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Label>Curation End</Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !curationEnd && 'text-muted-foreground',
                )}
              >
                {curationEnd ? (
                  format(curationEnd, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={curationEnd}
                onSelect={setCurationEnd}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </DialogDescription>
        <DialogFooter className="grid grid-cols-2 gap-3 sm:space-x-0">
          <CreateEditionButton
            isOpen={isOpen}
            projectId={_id}
            fee={edition_price}
            address={admin_address}
            briefId={pool}
            onChainStatus={onChainStatus}
          />
          <ApproveEditionButton
            isOpen={isOpen}
            editionId={editionId}
            onChainStatus={onChainStatus}
          />
          <StopEditionButton
            isOpen={isOpen}
            editionId={editionId}
            onChainStatus={onChainStatus}
          />
          <ResumeEditionButton
            isOpen={isOpen}
            editionId={editionId}
            onChainStatus={onChainStatus}
          />
          <Button
            onClick={() => {
              mutate();
            }}
            loading={isUpdateLoading}
          >
            Update project (database)
          </Button>
          <DeleteProjectButton projectId={_id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
