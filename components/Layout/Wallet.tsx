import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { shortenAddress } from '@/lib/utils';
import { usePrivy } from '@privy-io/react-auth';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Address, mainnet, useEnsName } from 'wagmi';
import { Button } from '../ui/button';

export function Wallet() {
  const { linkWallet, user } = usePrivy();
  const { login, logout, isLoggedIn, isLoading } = useAuth();

  const { data: ensName } = useEnsName({
    address: user?.wallet?.address as Address,
    chainId: mainnet.id,
    enabled: user?.wallet?.address !== undefined,
  });
  const { data: currentUserData, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  if (!isLoggedIn) {
    return (
      <Button
        onClick={() => {
          login();
        }}
        variant={'ghost'}
        loading={isLoading || isCurrentUserLoading}
      >
        {'LOGIN ⚙'}
      </Button>
    );
  }

  if (!user?.wallet?.address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'}>
            ADD WALLET
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-[200px]">
          <DropdownMenuLabel>
            <p className="pt-2 font-normal leading-4">
              Link a new wallet to your account.
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => linkWallet()}
            className="cursor-pointer"
          >
            Link Wallet
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (currentUserData === undefined) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'}>
            {ensName || shortenAddress(user.wallet.address)}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-[200px]">
          <DropdownMenuLabel>
            <p>{ensName || shortenAddress(user.wallet.address)}</p>
            <p className="pt-2 font-normal leading-4">
              No user data found, please contact support if issue persists.
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          {ensName || shortenAddress(user.wallet.address)}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {ensName || shortenAddress(user.wallet.address)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currentUserData?.bypasser && (
          <>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/admin">Admin</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/pool/create">Create Pool</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
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
