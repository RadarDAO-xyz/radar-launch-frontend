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
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { mainnet, useAccount, useEnsName } from 'wagmi';
import { Button } from '../ui/button';

export function Wallet() {
  const { login, logout, isVerified, verify: authenticate } = useAuth();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
    enabled: address !== undefined,
  });
  const { data: currentUserData, isLoading } = useGetCurrentUser();

  if (address === undefined) {
    return (
      <Button
        onClick={() => {
          if (address === undefined) {
            login();
          } else {
            authenticate();
          }
        }}
        variant={'ghost'}
      >
        {address === undefined ? 'LOGIN ⚙' : 'SIGN WALLET ⚙'}
      </Button>
    );
  }

  if (isLoading) {
    return <Button variant="ghost" loading />;
  }

  if (currentUserData === undefined) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'}>
            {ensName || shortenAddress(address)}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-[200px]">
          <DropdownMenuLabel>
            <p>{ensName || shortenAddress(address)}</p>
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
          {ensName || shortenAddress(address)}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {ensName || shortenAddress(address)}
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
