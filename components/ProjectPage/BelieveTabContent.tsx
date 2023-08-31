import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useGetProject } from '@/hooks/useGetProject';
import { useGetProjectBelievers } from '@/hooks/useGetProjectBelievers';
import { believeProject } from '@/lib/backend';
import { useAccount, usePublicClient, useQuery, useQueryClient, useSignMessage, useWaitForTransaction, useWalletClient } from 'wagmi';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { useEffect, useState } from 'react';
import { ProjectStatus } from '@/types/mongo';
import { format } from 'date-fns';
import { shortenAddress } from '@/lib/utils';
import { radarEditionsABI, usePrepareRadarEditionsBelieveProject, useRadarEditionsBelieveProject, useRadarEditionsEditionBelievedEvent } from '@/lib/generated';
import { CONTRACT_ADDRESS } from '@/constants/address';

interface Props {
  id: string;
  editionId?: number
}

export function BelieveTabContent({ id, editionId }: Props) {
  const { getLogs } = usePublicClient()
  const [isOpen, setIsOpen] = useState(false);
  const { data: projectData } = useGetProject(id);
  const { isLoggedIn, login } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { address } = useAccount();
  const [hasToasted, setHasToasted] = useState(false)

  const { data: believerLogs } = useQuery([CacheKey.BELIEVER_LOGS, editionId], () => getLogs({
    address: CONTRACT_ADDRESS,
    event: {
      type: 'event',
      anonymous: false,
      inputs: [
        {
          name: 'believer',
          internalType: 'address',
          type: 'address',
          indexed: true,
        },
        {
          name: 'editionId',
          internalType: 'uint256',
          type: 'uint256',
          indexed: true,
        },
        {
          name: 'hashOne',
          internalType: 'bytes32',
          type: 'bytes32',
          indexed: false,
        },
        {
          name: 'hashTwo',
          internalType: 'bytes32',
          type: 'bytes32',
          indexed: false,
        },
        {
          name: 'hashThree',
          internalType: 'bytes32',
          type: 'bytes32',
          indexed: false,
        },
      ],
      name: 'EditionBelieved',
    },
    fromBlock: 108947105n
  }), { enabled: editionId !== undefined })

  const { data: signData, signMessageAsync, isLoading } = useSignMessage({
    message: `I ${address ? `(${address})` : ''
      } support ${projectData?.title} at ${new Date().toISOString()}

and a better future in: ${projectData?.tags.join(', ')}`,
    onSuccess: async (data, variables) => {
      // await queryClient.invalidateQueries([CacheKey.PROJECT_BELIEVERS, id]);
      toast({
        title: 'Message successfully signed, please upload it on-chain',
      });
    },
  });

  const { config } = usePrepareRadarEditionsBelieveProject({
    address: CONTRACT_ADDRESS,
    account: address,
    args: [BigInt(editionId || 0), `0x${signData?.substring(2, 66)}`, `0x${signData?.substring(66, 130)}`, `0x${signData?.substring(130)}00000000000000000000000000000000000000000000000000000000000000`],
    enabled: Boolean(signData?.length) && address !== undefined && editionId !== undefined
  });
  const { data: believeProjectData, writeAsync: believeProjectWriteAsync, isLoading: believeProjectIsLoading } = useRadarEditionsBelieveProject(config);
  const { isLoading: believeProjectTxIsLoading, isSuccess } = useWaitForTransaction({
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
    }
  }, [isSuccess, believeProjectData?.hash]);

  const uploadSignature = async () => {
    if (isOpen && signData?.length) {
      try {
        await believeProjectWriteAsync?.();
      } catch (e) {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'An unexpected error occured',
          description: 'Check the console for more information',
        });
      }
    }
  }

  const hasBelieved = believerLogs?.find(log => log.args.believer === address) !== undefined

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
            {hasBelieved ? "Thank you for believing in this project!" : "I believe in this project"
            }
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
                } else if (signData === undefined) {
                  await signMessageAsync();
                } else {
                  await uploadSignature();
                }
              }}
              loading={isLoading || believeProjectIsLoading}
            >
              {!isLoggedIn ? 'LOGIN' : signData === undefined ? "SIGN MESSAGE" : "UPLOAD SIGNATURE"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="text-center text-muted-foreground">
        Build reputation on Launch
      </p>
      <div className="grid gap-2 pt-6">
        {believerLogs?.slice(0, 20).map((believer) => (
          <div
            key={believer.transactionHash}
            className="flex justify-between border-y pb-2 pt-2 text-xs"
          >
            {believer.args.believer &&
              <p>{shortenAddress(believer.args.believer)}</p>
            }
            <div className="text-right text-muted-foreground">
              <p>{believer.blockNumber.toString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
