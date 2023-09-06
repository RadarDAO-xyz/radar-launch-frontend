import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useGetProject } from '@/hooks/useGetProject';
import {
  usePrepareRadarEditionsBelieveProject,
  useRadarEditionsBelieveProject,
  useRadarEditionsEditionBelievedEvent,
} from '@/lib/generated';
import { shortenAddress } from '@/lib/utils';
import { ProjectStatus } from '@/types/mongo';
import { useEffect, useState } from 'react';
import {
  useAccount,
  usePublicClient,
  useQuery,
  useQueryClient,
  useSignMessage,
  useWaitForTransaction,
} from 'wagmi';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

interface Props {
  id: string;
  editionId?: number;
  tags: string;
}

export function BelieveTabContent({ id, editionId, tags }: Props) {
  const { getLogs } = usePublicClient();
  const [isOpen, setIsOpen] = useState(false);
  const { data: projectData } = useGetProject(id);
  const { isLoggedIn, login } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { address } = useAccount();
  const [hasToasted, setHasToasted] = useState(false);
  const { data: believerLogs, isLoading } = useQuery(
    [CacheKey.BELIEVER_LOGS, editionId, id],
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
        fromBlock: 108947105n,
      }),
    { enabled: editionId !== undefined },
  );

  const { config } = usePrepareRadarEditionsBelieveProject({
    address: CONTRACT_ADDRESS,
    account: address,
    args: [BigInt(editionId || 0), tags],
    enabled:
      address !== undefined && editionId !== undefined && tags.length > 0,
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
      setIsOpen(false);
      queryClient.invalidateQueries([CacheKey.BELIEVER_LOGS, editionId, id]);
    }
  }, [isSuccess, believeProjectData?.hash]);

  const hasBelieved =
    believerLogs?.find((log) => log.args?.believer === address) !== undefined;

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <p>Believers</p>
        <p>{believerLogs?.length || 0}</p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DialogTrigger asChild>
          <Button
            className="mb-4 w-full"
            disabled={projectData?.status !== ProjectStatus.LIVE || hasBelieved}
            loading={isLoading}
          >
            {hasBelieved
              ? 'Thank you for believing in this project!'
              : 'I believe in this project'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Show your belief in this project</DialogTitle>
            <DialogDescription>
              You will be signing a message to show your belief in the project,
              which will be visible to all.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                if (!isLoggedIn) {
                  login();
                } else {
                  believeProjectWriteAsync?.();
                }
              }}
              loading={isLoading || believeProjectIsLoading}
            >
              {!isLoggedIn ? 'LOGIN' : 'UPLOAD BELIEF SIGNATURE'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="text-center text-muted-foreground">
        Build reputation in {projectData?.tags.join(', ') ?? 'Launch'}
      </p>
      <div className="grid gap-2 pt-6">
        {believerLogs
          ?.reverse()
          .slice(0, 20)
          .filter(
            (log) =>
              log.args?.believer !== undefined && log.args?.tags !== undefined,
          )
          .map((believer) => (
            <div
              key={believer.transactionHash}
              className="flex justify-between border-y pb-2 pt-2 text-xs"
            >
              <p>{shortenAddress(believer.args.believer!)}</p>
              <div className="text-right text-muted-foreground">
                <p>{believer.blockNumber.toString()}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
