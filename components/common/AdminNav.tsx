import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { shortenAddress } from '@/lib/utils';
import { User, WalletResolvable } from '@/types/mongo';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { HTMLParsedComponent } from './HTMLParsedComponent';
import { DEFAULT_AVATAR_IMAGE } from '@/constants/links';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';

interface Props {
  isUpdateProfile?: boolean;
  user?: Omit<User, 'wallets'> & { wallets: WalletResolvable[] | string[] };
}

export function AdminNav({ isUpdateProfile = false, user }: Props) {
  const { data } = useGetCurrentUser();
  const { wallet } = usePrivyWagmi();

  if (data !== undefined && data._id === user?._id) {
    return (
      <>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.profile || DEFAULT_AVATAR_IMAGE} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl">{user.name}</h2>
              <p className="font-mono text-gray-600">
                {typeof user.wallets?.[0] === 'string'
                  ? shortenAddress(user.wallets[0] || '')
                  : isUpdateProfile && wallet
                  ? shortenAddress(wallet.address)
                  : ''}
              </p>
            </div>
          </div>
          <div className="mt-4 flex space-x-4 md:mt-0">
            {/* {isUpdateProfile && (
    <Link className="admin-link" href="/updates">
      Share Update ↗
    </Link>
  )} */}
            {!isUpdateProfile && (
              <Link className="admin-link" href="/profile/edit">
                Edit Profile ↗
              </Link>
            )}
          </div>
        </div>
        <hr className="mt-6" />
        <div className="grid grid-cols-1 items-start gap-5 py-4 lg:grid-cols-6">
          <HTMLParsedComponent
            className="col-span-1 lg:col-span-4"
            text={user.bio || 'Bio'}
          />
          <div className="col-span-1" />
          <Button variant={'ghost'} className="col-span-1">
            Find out more
          </Button>
        </div>
      </>
    );
  }

  // other user's view of your page
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="order-2 flex flex-col justify-center pr-8 lg:order-1 lg:col-span-3">
        <h1 className="pb-8 pt-8 font-base text-2xl">{user?.name}</h1>
        <HTMLParsedComponent
          text={user?.bio || ''}
          className="max-w-[600px] pb-4"
        />
        {user?.socials?.startsWith('https://') ? (
          <Button className="max-w-[200px]" asChild>
            <Link href={user.socials}>Socials</Link>
          </Button>
        ) : (
          <p>{user?.socials}</p>
        )}
      </div>
      <div className="order-1 justify-center text-center lg:order-2 lg:col-span-2">
        <img
          src={user?.profile || DEFAULT_AVATAR_IMAGE}
          alt={user?.name + ' Profile Photo'}
          className="rounded-xl rounded-xl border border p-10 shadow-lg"
        />
      </div>
    </div>
  );
}
