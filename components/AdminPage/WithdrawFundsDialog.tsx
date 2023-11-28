import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  usePrepareRadarEditionsWithdrawFunds,
  useRadarEditionsGetWithdrawableFunds,
  useRadarEditionsWithdrawFunds,
} from '@/lib/generated';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { chains } from '@/lib/wagmi';
import { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { useAccount } from 'wagmi';

export function WithdrawFundsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0n);
  const { address } = useAccount();

  const { data: withdrawableAmount, isLoading: isGetWithdrawableFundsLoading } =
    useRadarEditionsGetWithdrawableFunds({
      address: CONTRACT_ADDRESS,
      chainId: chains[0].id,
      enabled: isOpen,
    });
  const { config } = usePrepareRadarEditionsWithdrawFunds({
    address: CONTRACT_ADDRESS,
    account: address,
    args: [amount],
    enabled: isOpen,
  });
  const { isLoading, writeAsync } = useRadarEditionsWithdrawFunds(config);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Withdraw Funds</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogTitle>Withdraw Funds</DialogTitle>
        <DialogDescription className="space-y-4">
          <p>Withdrawable Amount: {withdrawableAmount?.toString()}</p>
          <Input
            placeholder="Amount (in wei)"
            type="number"
            value={amount.toString()}
            onChange={(e) => setAmount(BigInt(e.target.value))}
          />
        </DialogDescription>
        <DialogFooter>
          <Button
            loading={isLoading}
            disabled={isGetWithdrawableFundsLoading}
            onClick={() => writeAsync?.()}
          >
            Withdraw Funds
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
