import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { shortenAddress } from "@/lib/utils";
import { User, WalletResolvable } from "@/types/mongo";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  isUpdateProfile?: boolean;
  user?: Omit<User, "wallets"> & { wallets: WalletResolvable[] | string[] };
}

export function AdminNav({ isUpdateProfile = false, user }: Props) {
  const { data } = useGetCurrentUser();

  if (data !== undefined && data._id === user?._id) {
    return (
      <div className="flex items-center justify-between flex-col md:flex-row">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user?.profile || "/default-avatar.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl">{user.name}</h2>
            <p className="font-mono text-gray-600">
              {typeof user.wallets?.[0] === "string"
                ? shortenAddress(user.wallets[0] || "")
                : ""}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
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
    );
  }

  // other user's view of your page
  return <div>asdad</div>;
}
