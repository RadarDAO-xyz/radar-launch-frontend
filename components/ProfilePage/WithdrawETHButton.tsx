import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsWithdrawEditionBalance,
  useRadarEditionsWithdrawEditionBalance,
} from '@/lib/generated';
import { parseEther } from '@/lib/utils';
import { ProjectStatus } from '@/types/mongo';
import { ProjectWithChainData } from '@/types/web3';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { useEffect, useState } from 'react';
import { Address, useWaitForTransaction } from 'wagmi';
import { chains } from '../../lib/wagmi';
import { Button } from '../ui/button';
import { DialogFooter, DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

export function WithdrawETHButton({ status, editionId }: ProjectWithChainData) {
  const [amount, setAmount] = useState(0);
  const [hasToasted, setHasToasted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();
  const { wallet } = usePrivyWagmi();
  const { config } = usePrepareRadarEditionsWithdrawEditionBalance({
    account: wallet?.address as Address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      wallet?.address !== undefined &&
      editionId !== undefined &&
      editionId >= 0,
    args: [BigInt(editionId || 0), parseEther(amount.toString())],
  });
  const { writeAsync, data, error } =
    useRadarEditionsWithdrawEditionBalance(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: data?.hash !== undefined,
  });

  useEffect(() => {
    if (isLoading && data?.hash) {
      toast({
        title: 'Transaction sent!',
        description: 'Awaiting for confirmation...',
      });
    }
  }, [isLoading, data?.hash]);

  useEffect(() => {
    if (isSuccess && data?.hash && !hasToasted) {
      toast({
        title: 'Success!',
        description: 'Your NFT has been minted!',
      });
      setHasToasted(true);
      setIsOpen(false);
    }
  }, [isSuccess, data?.hash]);

  function onSubmit() {
    writeAsync?.();
  }

  useEffect(() => {
    if (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An unexpected error occured',
        description: 'Check the console for more information',
      });
    }
  }, [error]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={
            status === ProjectStatus.IN_REVIEW ||
            status === ProjectStatus.APPROVED
          }
        >
          Withdraw ETH
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw ETH from your project</DialogTitle>
          <DialogDescription>
            You can only withdraw up to the amount displayed in the balance.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="amount" className="col-span-2 mb-0 text-right">
              Amount (in ETH)
            </Label>
            <Input
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              id="amount"
              type="number"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onSubmit()}>
            WITHDRAW
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
