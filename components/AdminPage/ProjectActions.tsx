import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTRACT_ADDRESS } from "@/constants/address";
import {
  usePrepareRadarEditionsApproveEdition,
  usePrepareRadarEditionsStopEdition,
  useRadarEditionsApproveEdition,
  useRadarEditionsStopEdition,
} from "@/lib/generated";
import { Project, ProjectStatus } from "@/types/mongo";
import { useRef, useState } from "react";
import { DownloadSupporters } from "../ProfilePage/DownloadSupporters";
import { chains } from "../Providers/Web3Provider";
import { DialogFooter } from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "wagmi";
import { CacheKey } from "@/constants/react-query";
import { updateProject } from "@/lib/backend";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface ProjectWithChainData extends Project {
  editionId?: number;
  onChainStatus?: number;
}

export function ProjectActions(props: ProjectWithChainData) {
  const { _id, status, editionId, curation } = props;

  const [isOpen, setIsOpen] = useState(false);

  const { idToken } = useAuth();
  const projectStatusRef = useRef<HTMLInputElement>(null);
  const [curationStart, setCurationStart] = useState<Date | undefined>(
    curation?.start ? new Date(curation.start) : undefined
  );
  const [curationEnd, setCurationEnd] = useState<Date | undefined>(
    curation?.end ? new Date(curation.end) : undefined
  );

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { config } = usePrepareRadarEditionsApproveEdition({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id) && isOpen && editionId !== undefined,
    args: [BigInt(+(editionId || 0)) || 0n],
  });
  const { writeAsync, isLoading: isApproveLoading } =
    useRadarEditionsApproveEdition(config);
  const { config: stopEditionConfig } = usePrepareRadarEditionsStopEdition({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id) && isOpen && editionId !== undefined,
    args: [BigInt(+(editionId || 0)) || 0n],
  });
  const { writeAsync: writeStopEditionAsync, isLoading: isStopLoading } =
    useRadarEditionsStopEdition(stopEditionConfig);

  const { mutate, isLoading: isUpdateLoading } = useMutation(
    [CacheKey.UDPATE_PROJECT_STATUS, _id, projectStatusRef.current?.value],
    () =>
      updateProject(
        {
          status: +projectStatusRef.current!.value,
          curation: {
            start: curationStart?.toISOString(),
            end: curationEnd?.toISOString(),
          },
        },
        _id,
        idToken
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CacheKey.PROJECTS]);
      },
      onError: (e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "An unexpected error occured",
          description: "Check the console for more information",
        });
      },
    }
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">Actions</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Actions panel</DialogTitle>
          <DialogDescription className="space-y-4">
            <Label>Edition ID</Label>
            <Input
              placeholder="Edition ID"
              disabled
              type="number"
              defaultValue={String(editionId)}
            />
            <Label>New Database Project Status</Label>
            <Input
              placeholder="New Project Status"
              type="number"
              ref={projectStatusRef}
              defaultValue={status}
            />
            <Label>Curation Start</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !curationStart && "text-muted-foreground"
                  )}
                >
                  {curationStart ? (
                    format(curationStart, "PPP")
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
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !curationEnd && "text-muted-foreground"
                  )}
                >
                  {curationEnd ? (
                    format(curationEnd, "PPP")
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
          <DialogFooter className="flex !flex-col !space-x-0 space-y-4">
            <Button
              disabled={isApproveLoading}
              onClick={() => {
                try {
                  writeAsync?.();
                } catch (e) {
                  console.error(e);
                  toast({
                    variant: "destructive",
                    title: "An unexpected error occured",
                    description: "Check the console for more information",
                  });
                }
              }}
            >
              Approve Edition (on-chain)
            </Button>
            <Button
              disabled={isStopLoading}
              onClick={() => {
                try {
                  writeStopEditionAsync?.();
                } catch (e) {
                  console.error(e);
                  toast({
                    variant: "destructive",
                    title: "An unexpected error occured",
                    description: "Check the console for more information",
                  });
                }
              }}
            >
              Stop Edition (on-chain)
            </Button>
            <Button
              onClick={() => {
                mutate();
              }}
              disabled={isUpdateLoading}
            >
              Update project (database)
            </Button>
            <DeleteProjectButton projectId={_id} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DownloadSupporters {...props} />
    </>
  );
}
