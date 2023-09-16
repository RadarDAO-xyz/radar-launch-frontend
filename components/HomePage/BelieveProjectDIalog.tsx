import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ProjectWithChainData } from '@/pages/profile/[id]';
import {
  useAccount,
  useBlockNumber,
  usePublicClient,
  useQuery,
  useQueryClient,
  useWaitForTransaction,
} from 'wagmi';
import { CacheKey } from '@/constants/react-query';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsBelieveProject,
  useRadarEditionsBelieveProject,
} from '@/lib/generated';
import { useEffect, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { shortenAddress } from '@/lib/utils';
import { HTMLParsedComponent } from '../Layout/HTMLParsedComponent';
import { ProjectStatus } from '@/types/mongo';
import { useAuth } from '@/hooks/useAuth';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { ProjectVideo } from './ProjectVideo';

const START_BLOCK_FOR_BELIEVE = 108947105n;
const BLOCK_TIME_IN_SECONDS = 2;

export function BelieveProjectDialog({
  _id,
  title,
  editionId,
  tags,
  description,
  video_url,
  status,
}: ProjectWithChainData) {
  const [hasToasted, setHasToasted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { getLogs } = usePublicClient();
  const { isConnected, address } = useAccount();
  const { toast } = useToast();
  const { login } = useAuth();
  const { data: blockNumber } = useBlockNumber();

  const { data: believerLogs, isLoading } = useQuery(
    [CacheKey.BELIEVER_LOGS, editionId, _id],
    () =>
      getLogs({
        address: CONTRACT_ADDRESS,
        args: {
          editionId: BigInt(editionId || 0),
        },
        event: {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'uint256',
              name: 'editionId',
              type: 'uint256',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'believer',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'tags',
              type: 'string',
            },
          ],
          name: 'EditionBelieved',
          type: 'event',
        },
        fromBlock: START_BLOCK_FOR_BELIEVE,
      }),
    { enabled: editionId !== undefined && isOpen },
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
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">BELIEVE +</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen w-full overflow-y-auto lg:max-w-3xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <ProjectVideo
            videoUrl={video_url}
            className="col-span-2 pt-2 lg:pt-0"
            videoClassName="rounded-lg"
          />
          <div className="col-span-2">
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            <HTMLParsedComponent className="text-gray-700" text={description} />
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <Button key={tag} className="" variant="outline" disabled>
                  {tag.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DialogDescription className="space-y-4">
          <Button
            className="mb-4 mt-4 w-full"
            disabled={status !== ProjectStatus.LIVE || hasBelieved}
            onClick={async () => {
              // here we use isConnected instead since web3 interaction
              if (!isConnected) {
                login();
              } else {
                believeProjectWriteAsync?.();
              }
            }}
            loading={isLoading || believeProjectIsLoading}
          >
            {!isConnected
              ? 'Please login to believe in this project'
              : hasBelieved
              ? 'Thank you for believing in this project!'
              : 'I believe in this project'}
          </Button>
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
