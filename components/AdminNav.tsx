import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { shortenAddress } from "@/lib/utils";
import { User, WalletResolvable } from "@/types/mongo";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { HTMLParsedComponent } from "./Layout/HTMLParsedComponent";
import { DEFAULT_AVATAR_IMAGE } from "@/constants/links";

interface Props {
  isUpdateProfile?: boolean;
  user?: Omit<User, "wallets"> & { wallets: WalletResolvable[] | string[] };
}

export function AdminNav({ isUpdateProfile = false, user }: Props) {
  const { data } = useGetCurrentUser();

  if (data !== undefined && data._id === user?._id) {
    return (
      <>
        <div className="flex items-center justify-between flex-col md:flex-row">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.profile || DEFAULT_AVATAR_IMAGE} />
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
        <hr className="mt-6" />
        <div className="py-4 grid grid-cols-1 lg:grid-cols-6 gap-5 items-start">
          <HTMLParsedComponent
            className="col-span-1 lg:col-span-4"
            text={user.bio || "Bio"}
          />
          <div className="col-span-1" />
          <Button variant={"ghost"} className="col-span-1">
            Find out more
          </Button>
        </div>
      </>
    );
  }

  // other user's view of your page
  return (
    <div className="grid lg:grid-cols-5 grid-cols-1">
      <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-center pr-8">
        <h1 className="font-base pb-8 pt-8 text-2xl">{user?.name}</h1>
        <HTMLParsedComponent
          text={user?.bio || ""}
          className="pb-4 max-w-[600px]"
        />
        {user?.socials?.startsWith("https://") ? (
          <Button className="max-w-[200px]" asChild>
            <Link href={user.socials}>Socials</Link>
          </Button>
        ) : (
          <p>{user?.socials}</p>
        )}
      </div>
      <div className="lg:col-span-2 order-1 lg:order-2 justify-center text-center">
        <img
          src={user?.profile || DEFAULT_AVATAR_IMAGE}
          alt={user?.name + " Profile Photo"}
          className="rounded-xl border shadow-lg rounded-xl p-10 border"
        />
      </div>
    </div>
  );
}
