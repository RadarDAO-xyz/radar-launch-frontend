import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CONTRACT_ADDRESS } from "@/constants/address";
import { useAuth } from "@/hooks/useAuth";
import {
  usePrepareRadarEditionsWithdrawEditionBalance,
  useRadarEditionsWithdrawEditionBalance,
} from "@/lib/generated";
import { parseEther } from "@/lib/utils";
import { ProjectWithChainData } from "@/pages/profile/[id]";
import { ProjectStatus } from "@/types/mongo";
import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { chains } from "../Providers/Web3Provider";
import { Button } from "../ui/button";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export function WithdrawETHButton({ status, editionId }: ProjectWithChainData) {
  const amountRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { address } = useAccount();
  const { isLoggedIn } = useAuth();
  const { config } = usePrepareRadarEditionsWithdrawEditionBalance({
    account: address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(address) && amountRef.current?.value !== undefined,
    args: [
      BigInt(editionId),
      parseEther(amountRef.current?.value.toString() || "0"),
    ],
  });
  const { writeAsync, error } = useRadarEditionsWithdrawEditionBalance(config);

  function onSubmit() {
    writeAsync?.();
  }

  useEffect(() => {
    if (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An unexpected error occured",
        description: "Check the console for more information",
      });
    }
  }, [error]);

  return (
    <Dialog>
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
            <Label htmlFor="amount" className="text-right mb-0 col-span-2">
              Amount (in ETH)
            </Label>
            <Input
              ref={amountRef}
              id="amount"
              type="number"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => onSubmit()}
            disabled={!isLoggedIn}
          >
            {isLoggedIn ? "WITHDRAW" : "Please Sign In"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
