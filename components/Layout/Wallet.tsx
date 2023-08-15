import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAccount, useEnsAddress, useEnsName } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { chains } from "../Providers/Web3Provider";
import Link from "next/link";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

export function Wallet() {
  const { login, logout, isLoggedIn } = useAuth();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: chains[0].id,
    enabled: address !== undefined,
  });
  const { data: currentUserData } = useGetCurrentUser();

  if (isLoggedIn && address !== undefined && currentUserData !== undefined) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            {ensName || shortenAddress(address)}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {ensName || shortenAddress(address)}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={`/profile/${currentUserData._id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={`/profile/edit`}>Edit Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() => {
        login();
      }}
      variant={"ghost"}
    >
      Login ⚙
    </Button>
  );
}
