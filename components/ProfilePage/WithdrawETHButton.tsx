import { Project, ProjectStatus } from "@/types/mongo";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import {
  usePrepareRadarEditionsWithdrawEditionBalance,
  useRadarEditionsWithdrawEditionBalance,
} from "@/lib/generated";
import { useAccount } from "wagmi";
import isTestnet from "@/lib/isTestnet";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { chains } from "../Web3Provider";
import { ProjectWithChainData } from "@/pages/profile/[id]";
import { useToast } from "../ui/use-toast";
import { formatEther, parseEther } from "@/lib/utils";

export function WithdrawETHButton({ status, editionId }: ProjectWithChainData) {
  const amountRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { address } = useAccount();
  const { config } = usePrepareRadarEditionsWithdrawEditionBalance({
    account: address,
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
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
        title: "An error occurred",
        description: "Please check your browser console for more information",
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
          <Button type="submit" onClick={() => onSubmit()}>
            WITHDRAW
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
