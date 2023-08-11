import { CollectedVisions } from "@/components/CollectedVisions";
import { chains } from "@/components/Web3Provider";
import { YourVisions } from "@/components/YourVisions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useGetUser } from "@/hooks/useGetUser";
import {
  useRadarEditionsGetBalances,
  useRadarEditionsGetEditions,
} from "@/lib/generated";
import isTestnet from "@/lib/isTestnet";
import { shortenAddress } from "@/lib/utils";
import { Project } from "@/types/mongo";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export interface OnChainProject {
  status: number;
  fee: bigint;
  balance: bigint;
  owner: `0x${string}`;
  id: string;
}

export interface ProjectIdWithBalance {
  id: string;
  amount: bigint;
}

export interface ProjectWithChainData extends Project {
  balance: bigint;
  editionId: number;
}

export interface ProjectWithOwnedAmount extends Project {
  ownedAmount: bigint;
  editionId: number;
}

function transformYourVisionsProjects(
  databaseProjects?: Project[],
  chainProjects?: OnChainProject[]
): ProjectWithChainData[] {
  if (!databaseProjects || !chainProjects) {
    return [];
  }

  const projectIds = new Set(
    // filter for "" ids
    chainProjects.map((project) => project.id).filter(Boolean)
  );
  const projectBalances: Record<string, bigint> = {};
  chainProjects.forEach((project) => {
    projectBalances[project.id] = project.balance;
  });
  const projectIdToEditionId: Record<string, number> = chainProjects.reduce<
    Record<string, number>
  >((acc, project, index) => {
    acc[project.id] = index;
    return acc;
  }, {});

  return databaseProjects
    .filter((project) => projectIds.has(project._id))
    .map((project) => ({
      ...project,
      balance: projectBalances[project._id],
      editionId: projectIdToEditionId[project._id],
    }));
}

function transformCollectionVisionsProject(
  databaseProjects?: Project[],
  chainBalances?: ProjectIdWithBalance[]
): ProjectWithOwnedAmount[] {
  if (!databaseProjects || !chainBalances) {
    return [];
  }

  const projectBalances: Record<string, bigint> = {};
  chainBalances.forEach((balance) => {
    projectBalances[balance.id] = balance.amount;
  });
  const projectIdToEditionId: Record<string, number> = chainBalances.reduce<
    Record<string, number>
  >((acc, project, index) => {
    acc[project.id] = index;
    return acc;
  }, {});

  return databaseProjects
    .filter((project) => projectBalances[project._id] > 0n)
    .map((project) => ({
      ...project,
      ownedAmount: projectBalances[project._id],
      editionId: projectIdToEditionId[project._id],
    }));
}

export default function AdminPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: currentUserData } = useGetCurrentUser();
  const { data: userData } = useGetUser(id?.toString());
  const { address } = useAccount();
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id),
  });
  const { data: ownedOnChainProjects } = useRadarEditionsGetBalances({
    account: address,
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0].id,
    args: [address!],
    enabled: Boolean(chains[0].id) && Boolean(address),
  });
  const { data: databaseProjects } = useGetProjects();

  if (userData === undefined) {
    return (
      <div className="mt-36 container mb-20 text-center">
        <h1>No user data found</h1>
      </div>
    );
  }

  const yourVisionsProjects = transformYourVisionsProjects(
    databaseProjects,
    onChainProjects as OnChainProject[]
  ).filter(
    (project) => project.admin_address.toUpperCase() === address?.toUpperCase()
  );
  const collectedVisionsProjects = transformCollectionVisionsProject(
    databaseProjects,
    ownedOnChainProjects as ProjectIdWithBalance[]
  );
  return (
    <div className="mt-[80px] md:pt-6 pb-12 container max-w-7xl">
      <div className="flex items-center justify-between flex-col md:flex-row">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={userData?.profile || "/default-avatar.png"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl">{userData.name}</h2>
            <p className="font-mono text-gray-600">
              {typeof userData.wallets?.[0] === "string"
                ? shortenAddress(userData.wallets[0] || "")
                : ""}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* <Link href="/">
            Share Update <MoveUpRight className="inline h-3 w-3" />
          </Link> */}
          {userData._id === currentUserData?._id && (
            <Link href={`/profile/edit`}>
              Edit Profile <MoveUpRight className="inline h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
      <hr className="mt-6" />
      <div className="py-4 flex justify-between items-center">
        <p>Bio</p>
        <Button variant={"ghost"}>Find out more</Button>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="your-visions">
          <TabsList className="justify-start w-full gap-4 mx-auto mb-6">
            <TabsTrigger
              // className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal"
              value="your-visions"
            >
              Your Visions
            </TabsTrigger>
            <TabsTrigger
              // className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal"
              value="collected-visions"
            >
              Collected Visions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="your-visions">
            {yourVisionsProjects.length === 0 ? (
              <div className="py-20 text-center">
                {address !== undefined ? (
                  <>
                    <p className="text-2xl pb-4">Nothing to see here yet...</p>
                    <Link href="/project" className="underline">
                      Be inspired
                    </Link>
                  </>
                ) : (
                  <p className="text-2xl pb-4">Please login</p>
                )}
              </div>
            ) : (
              <YourVisions projects={yourVisionsProjects} />
            )}
          </TabsContent>
          <TabsContent value="collected-visions">
            {collectedVisionsProjects.length === 0 ? (
              <div className="py-20 text-center">
                {address !== undefined ? (
                  <>
                    <p className="text-2xl pb-4">Nothing to see here yet...</p>
                    <Link href="/project" className="underline">
                      Be inspired
                    </Link>
                  </>
                ) : (
                  <p className="text-2xl pb-4">Please login</p>
                )}
              </div>
            ) : (
              <CollectedVisions projects={collectedVisionsProjects} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
