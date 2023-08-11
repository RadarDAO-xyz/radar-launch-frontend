import { User } from "@/types/mongo";
import Link from "next/link";

interface Props {
  isUpdateProfile?: boolean;
  user?: User;
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
        <p>{user?.wallets?.[0] || "0x..."}</p>
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
