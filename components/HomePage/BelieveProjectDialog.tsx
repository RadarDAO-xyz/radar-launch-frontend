import { Button, ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import {
  usePrepareRadarEditionsBelieveProject,
  useRadarEditionsBelieveProject,
} from '@/lib/generated';
import { cn, shortenAddress } from '@/lib/utils';
import { ProjectWithChainData } from '@/types/web3';
import { ProjectStatus } from '@/types/mongo';
import { format } from 'date-fns';
import Link from 'next/link';
import { RefAttributes, useEffect, useState } from 'react';
import {
  useAccount,
  useBlockNumber,
  usePublicClient,
  useQuery,
  useQueryClient,
  useWaitForTransaction,
} from 'wagmi';
import { HTMLParsedComponent } from '../Layout/HTMLParsedComponent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { ProjectVideo } from './ProjectVideo';
import { useGetBelieveEvents } from '@/hooks/useGetBelieveEvents';
import { Badge } from '../ui/badge';
import { ProjectVideoPlayer } from '../Layout/ProjectVideoPlayer';

const START_BLOCK_FOR_BELIEVE = 108947105n;
const BLOCK_TIME_IN_SECONDS = 2;

interface Props extends ProjectWithChainData {
  buttonProps?: ButtonProps & RefAttributes<HTMLButtonElement>;
}

export function BelieveProjectDialog({
  _id,
  title,
  editionId,
  tags,
  description,
  video_url,
  status,
  buttonProps,
}: Props) {
  const [hasToasted, setHasToasted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { isConnected, address } = useAccount();
  const { toast } = useToast();
  const { login } = useAuth();
  const { data: blockNumber } = useBlockNumber();

  const { data: believerLogs, isLoading } = useGetBelieveEvents(
    _id,
    editionId,
    !isOpen,
  );
  const queryClient = useQueryClient();
  const { config } = usePrepareRadarEditionsBelieveProject({
    address: CONTRACT_ADDRESS,
    account: address,
    args: [BigInt(editionId || 0), tags.join(',')],
    enabled:
      address !== undefined &&
      editionId !== undefined &&
      tags.length > 0 &&
      isOpen,
  });
  const {
    data: believeProjectData,
    writeAsync: believeProjectWriteAsync,
    isLoading: believeProjectIsLoading,
  } = useRadarEditionsBelieveProject(config);
  const { isLoading: believeProjectTxIsLoading, isSuccess } =
    useWaitForTransaction({
      hash: believeProjectData?.hash,
      enabled: believeProjectData?.hash !== undefined,
    });

  useEffect(() => {
    if (believeProjectTxIsLoading && believeProjectData?.hash) {
      toast({
        title: 'Transaction sent!',
        description: 'Awaiting for confirmation...',
      });
    }
  }, [believeProjectTxIsLoading, believeProjectData?.hash]);

  useEffect(() => {
    if (isSuccess && believeProjectData?.hash && !hasToasted) {
      toast({
        title: 'Success!',
        description: 'Your belief has been recorded!',
      });
      setHasToasted(true);
      queryClient.invalidateQueries([CacheKey.BELIEVER_LOGS, editionId, _id]);
    }
  }, [isSuccess, believeProjectData?.hash]);

  const hasBelieved =
    believerLogs?.find((log) => log.args?.believer === address) !== undefined;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          {...buttonProps}
          className={cn('w-full rounded-none', buttonProps?.className)}
        >
          BELIEVE +
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-full overflow-y-auto p-10 scrollbar-hide lg:max-w-3xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className={cn('col-span-2 w-full pt-2 lg:pt-0')}>
            <ProjectVideoPlayer
              videoUrl={video_url}
              videoClassName="rounded-lg"
            />
          </div>
          <div className="col-span-2">
            <DialogTitle className="text-2xl uppercase">{title}</DialogTitle>
            <HTMLParsedComponent className="text-gray-700" text={description} />
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="!rounded-sm text-xs font-normal text-gray-600"
                  variant="outline"
                >
                  {tag.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogDescription className="space-y-4">
          <div className="mb-4 mt-4 flex gap-4">
            <Button
              className="flex-1"
              disabled={
                status !== ProjectStatus.LIVE ||
                hasBelieved ||
                editionId === undefined
              }
              onClick={async () => {
                // here we use isConnected instead since web3 interaction
                if (!isConnected) {
                  login();
                  setIsOpen(false);
                } else {
                  believeProjectWriteAsync?.();
                }
              }}
              loading={isLoading || believeProjectIsLoading}
            >
              {editionId === undefined
                ? 'Project not available for beliefs yet'
                : !isConnected
                ? 'Please login to believe in this project'
                : hasBelieved
                ? 'Thank you for believing in this project!'
                : 'I believe in this project'}
            </Button>
            <Button asChild variant="ghost">
              <Link href={`/project/${_id}`}>Read More</Link>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl">BELIEVERS</p>
            <p>{believerLogs?.length || 0}</p>
          </div>
          <div className="grid gap-2">
            {believerLogs
              ?.reverse()
              .slice(0, 20)
              .filter(
                (log) =>
                  log.args?.believer !== undefined &&
                  log.args?.tags !== undefined,
              )
              .map((believer) => {
                const timeDifferenceInSeconds =
                  BigInt(blockNumber || 0) - believer.blockNumber;
                const date = new Date(
                  Date.now() -
                    Number(timeDifferenceInSeconds) *
                      BLOCK_TIME_IN_SECONDS *
                      1000,
                );
                return (
                  <div
                    key={believer.transactionHash}
                    className="flex justify-between border-y pb-2 pt-2 text-xs"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p>{shortenAddress(believer.args.believer!)}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          {believer.args.believer}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="text-right text-muted-foreground">
                      <p>{format(date, 'do MMMM yyyy')}</p>
                      <p>{format(date, 'hh:mm a')}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
