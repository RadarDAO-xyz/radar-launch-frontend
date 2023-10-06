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
import { useGetBelieveEvents } from '@/hooks/useGetBelieveEvents';
import { useGetProject } from '@/hooks/useGetProject';
import {
  usePrepareRadarEditionsBelieveProject,
  useRadarEditionsBelieveProject,
  useRadarEditionsFutureFundFee,
} from '@/lib/generated';
import { shortenAddress } from '@/lib/utils';
import { chains } from '@/lib/wagmi';
import { ProjectStatus } from '@/types/mongo';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  Address,
  useBlockNumber,
  useQueryClient,
  useWaitForTransaction,
} from 'wagmi';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

interface Props {
  _id: string;
  editionId?: number;
  tags: string;
  isSelected: boolean;
  closeSheet?: () => void;
}

const BLOCK_TIME_IN_SECONDS = 2;

export function BelieveTabContent({
  _id,
  editionId,
  tags,
  isSelected,
  closeSheet,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasToasted, setHasToasted] = useState(false);

  const { data: projectData } = useGetProject(_id);
  const { login, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { wallet } = usePrivyWagmi();
  const { data: blockNumber } = useBlockNumber();
  const { data: believerLogs, isLoading } = useGetBelieveEvents(
    _id,
    editionId,
    !isSelected,
  );
  const { data: futureFundFee } = useRadarEditionsFutureFundFee();
  const { config } = usePrepareRadarEditionsBelieveProject({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    account: wallet?.address as Address,
    args: [BigInt(editionId || 0), tags],
    enabled:
      wallet?.address !== undefined &&
      editionId !== undefined &&
      tags.length > 0 &&
      futureFundFee !== undefined,
    value: futureFundFee,
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
      queryClient.invalidateQueries([CacheKey.BELIEVER_LOGS, editionId, _id]);
    }
  }, [isSuccess, believeProjectData?.hash]);

  const hasBelieved =
    believerLogs?.find((log) => log.args?.believer === wallet?.address) !==
    undefined;

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <p>Believers</p>
        <p>{believerLogs?.length || 0}</p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  setIsOpen(false);
                  closeSheet?.();
                } else {
                  believeProjectWriteAsync?.();
                }
              }}
              disabled={isLoggedIn && believeProjectWriteAsync === undefined}
              loading={isLoading || believeProjectIsLoading}
            >
              {!isLoggedIn ? 'Login' : 'I believe in this project'}
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
          .map((believer) => {
            const timeDifferenceInSeconds =
              BigInt(blockNumber || 0) - believer.blockNumber;
            const date = new Date(
              Date.now() -
                Number(timeDifferenceInSeconds) * BLOCK_TIME_IN_SECONDS * 1000,
            );
            return (
              <div
                key={believer.transactionHash}
                className="flex justify-between border-y pb-2 pt-2 text-xs"
              >
                <p>{shortenAddress(believer.args.believer!)}</p>
                <div className="text-right text-muted-foreground">
                  <p>{format(date, 'do MMMM yyyy')}</p>
                  <p>{format(date, 'hh:mm a')}</p>{' '}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
