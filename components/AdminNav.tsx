import { shortenAddress } from "@/lib/utils";
import { User, WalletResolvable } from "@/types/mongo";
import Link from "next/link";

interface Props {
  isUpdateProfile?: boolean;
  user?: Omit<User, "wallets"> & { wallets: WalletResolvable[] };
}

export function AdminNav({ isUpdateProfile = false, user }: Props) {
  return (
    <div className="flex mb-10 items-center">
      <img
        alt="User Avatar"
        className="admin-founder-image"
        src={user?.profile || "/default-avatar.png"}
      />
      <div>
        <h1>{user?.name || "Your Name"}</h1>
        <p className="font-mono text-gray-600">
          {shortenAddress(user?.wallets?.[0].address || "0x...")}
        </p>
      </div>
      <div className="admin-links ml-auto">
        {/* {isUpdateProfile && (
          <Link className="admin-link" href="/updates">
            Share Update ↗
          </Link>
        )} */}
        {!isUpdateProfile && (
          <Link className="admin-link" href="/update-profile">
            Edit Profile ↗
          </Link>
        )}
      </div>
    </div>
  );
}
