import { CollectedVisions } from "@/components/CollectedVisions";
import { YourVisions } from "@/components/YourVisions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { useGetProjects } from "@/hooks/useGetProjects";
import {
  useRadarEditionsGetBalances,
  useRadarEditionsGetEditions,
} from "@/lib/generated";
import isTestnet from "@/lib/isTestnet";
import { Project } from "@/types/mongo";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useRouter } from "next/router";
import { useGetUser } from "@/hooks/useGetUser";

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

  const { data: userData } = useGetUser(id?.toString());
  const { address, status } = useAccount();
  const { chain } = useNetwork();
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chain?.id,
    enabled: Boolean(chain),
  });
  const { data: ownedOnChainProjects } = useRadarEditionsGetBalances({
    account: address,
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chain?.id,
    args: [address!],
    enabled: Boolean(chain) && Boolean(address),
  });
  const { data: databaseProjects } = useGetProjects();

  if (status === "disconnected") {
    return (
      <div className="mt-36 container mb-20 text-center">
        <h1>Please login to see the page</h1>
        <p>
          You can login either with your wallet or other social authentication
          providers.
        </p>
      </div>
    );
  }

  if (userData === undefined) {
    return (
      <div className="mt-36 container mb-20 text-center">
        <h1>No user data found, please try logging in again.</h1>
        <p>
          When you login, you will need to sign a message with your wallet to
          use our platform.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-[80px] md:pt-6 pb-12 container max-w-7xl">
      <div className="flex items-center justify-between flex-col md:flex-row">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/default-avatar.png" />
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl">{userData.name}</h2>
            <p className="font-mono text-gray-600">
              {address ? shortenAddress(address) : ""}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/">
            Share Update <MoveUpRight className="inline h-3 w-3" />
          </Link>
          <Link href={`/profile/${userData._id}/edit`}>
            Edit Profile <MoveUpRight className="inline h-3 w-3" />
          </Link>
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
            <YourVisions
              projects={
                transformYourVisionsProjects(
                  databaseProjects,
                  onChainProjects as OnChainProject[]
                )
                // .filter(
                //   (project) => project.admin_address === address?.toUpperCase()
                // )
              }
            />
          </TabsContent>
          <TabsContent value="collected-visions">
            <CollectedVisions
              projects={transformCollectionVisionsProject(
                databaseProjects,
                ownedOnChainProjects as ProjectIdWithBalance[]
              )}
            />
          </TabsContent>
        </Tabs>
        <div className="py-20 text-center">
          <p className="text-2xl pb-4">Nothing to see here yet...</p>
          <Link href="/project" className="underline">
            Be inspired
          </Link>
        </div>
      </div>
    </div>
  );
}
