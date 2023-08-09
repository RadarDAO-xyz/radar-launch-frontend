import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { useAuth } from "@/hooks/useAuth";
import { useGetExchangeRate } from "@/hooks/useGetExchangeRate";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";
import {
  usePrepareRadarEditionsMintEdition,
  useRadarEditionsGetEditions,
  useRadarEditionsMintEdition,
  useRadarEditionsProtocolFee,
  useRadarEditionsTotalSupply,
} from "@/lib/generated";
import isTestnet from "@/lib/isTestnet";
import { cn, getCountdown } from "@/lib/utils";
import { Project, User } from "@/types/mongo";
import { DotIcon, MinusIcon, MoveDown, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useQuery, useWaitForTransaction } from "wagmi";
import { convertWeiToUsdOrEth } from "../../lib/convertWeiToUsdOrEth";
import { Markdown } from "../Markdown";
import { chains } from "../Web3Provider";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { ContributeForm } from "./ContributeForm";
import { SignUpForm } from "./SignUpForm";

async function getMintCheckoutLink(
  quantity: number,
  editionId?: number,
  value?: string, // project's mint fee,
  title?: string,
  imageUrl?: string,
  projectId?: string,
  socials?: string
): Promise<string> {
  if (
    editionId === undefined ||
    value === undefined ||
    title === undefined ||
    imageUrl === undefined
  ) {
    return "";
  }

  try {
    const result = await fetch(`/api/get-mint-checkout-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        editionId,
        value,
        quantity,
        title,
        imageUrl,
        projectId,
        socials,
      }),
    }).then((res) => res.json());

    if ("checkoutLinkIntentUrl" in result) {
      return result.checkoutLinkIntentUrl;
    }
  } catch (e) {
    console.error(e);
  }
  return "";
}

enum Tab {
  COLLECT = "collect",
  SIGN_UP = "sign-up",
  CONTRIBUTE = "contribute",
  BENEFITS = "benefits",
}

export function ProjectTabs({
  project,
  user,
}: {
  project: Project;
  user?: User;
}) {
  const [currentTab, setCurrentTab] = useState(Tab.COLLECT);
  const [quantity, setQuantity] = useState(1);
  const [hasToasted, setHasToasted] = useState(false);

  const { address } = useAccount();
  const { login, isLoggedIn } = useAuth();
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });
  const { data: protocolFee } = useRadarEditionsProtocolFee({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });

  const editionId: number | undefined = onChainProjects?.findIndex(
    (onChainProject) => onChainProject.id === project._id
  );
  const value =
    editionId !== undefined ? onChainProjects?.[editionId]?.fee : undefined;

  const { data: totalSupply } = useRadarEditionsTotalSupply({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [BigInt(Math.max(editionId || 0, 0))],
    enabled: Boolean(chains[0]?.id) && editionId !== undefined,
  });
  const { config } = usePrepareRadarEditionsMintEdition({
    account: address,
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [
      BigInt(editionId || 0),
      BigInt(quantity),
      address!,
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    ],
    value: BigInt((value || 0n) + (protocolFee || 0n)) * BigInt(quantity),
    enabled:
      value !== undefined &&
      editionId !== undefined &&
      address !== undefined &&
      isLoggedIn,
  });
  const { data: mintEditionData, writeAsync } =
    useRadarEditionsMintEdition(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: mintEditionData?.hash,
    enabled: mintEditionData?.hash !== undefined,
  });

  const { data: exchangeRateData } = useGetExchangeRate("ETH");

  const { data: checkoutLink, isLoading: isCheckoutLinkLoading } = useQuery(
    ["checkout-mint-link", editionId, value, quantity],
    () =>
      getMintCheckoutLink(
        quantity,
        editionId,
        (value! + protocolFee!).toString(),
        project.title,
        generateVideoThumbnail(project.video_url!),
        project._id,
        user?.socials?.replace("https://twitter.com/", "")
      ),
    {
      enabled:
        editionId !== undefined &&
        value !== undefined &&
        protocolFee !== undefined &&
        currentTab === Tab.COLLECT &&
        project !== undefined,
    }
  );

  const { toast } = useToast();

  useEffect(() => {
    if (isLoading && mintEditionData?.hash) {
      toast({
        title: "Transaction sent!",
        description: "Awaiting for confirmation...",
      });
    }
  }, [isLoading, mintEditionData?.hash]);

  useEffect(() => {
    if (isSuccess && mintEditionData?.hash && !hasToasted) {
      toast({
        title: "Success!",
        description: "Your NFT has been minted!",
      });
      setHasToasted(true);
    }
  }, [isSuccess, mintEditionData?.hash]);

  return (
    <Tabs
      defaultValue={Tab.COLLECT}
      onValueChange={(e) => setCurrentTab(e as Tab)}
    >
      <TabsList className="w-full gap-2 h-auto px-0 grid grid-cols-2 lg:grid-cols-3">
        <TabsTrigger value={Tab.COLLECT} asChild>
          <Button
            className="border-b-0 no-underline p-2 px-4 !bg-gray-100 hover:!bg-gray-200 w-full data-[state=active]:!bg-gray-300 col-span-1"
            variant={"ghost"}
          >
            Collect <MoveDown className="ml-1 w-3 h-3" />
          </Button>
        </TabsTrigger>
        <TabsTrigger value={Tab.SIGN_UP} asChild>
          <Button
            className="border-b-0 no-underline p-2 px-4 !bg-gray-100 hover:!bg-gray-200 w-full data-[state=active]:!bg-gray-300 col-span-1"
            variant={"ghost"}
          >
            Sign Up <MoveDown className="ml-1 w-3 h-3" />
          </Button>
        </TabsTrigger>
        <TabsTrigger value={Tab.CONTRIBUTE} asChild>
          <Button
            className="border-b-0 no-underline p-2 px-4 !bg-gray-100 hover:!bg-gray-200 w-full data-[state=active]:!bg-gray-300 col-span-1"
            variant={"ghost"}
          >
            Contribute <MoveDown className="ml-1 w-3 h-3" />
          </Button>
        </TabsTrigger>
        <TabsTrigger value={Tab.BENEFITS} asChild>
          <Button
            className="border-b-0 no-underline p-2 px-4 !bg-gray-100 hover:!bg-gray-200 w-full data-[state=active]:!bg-gray-300 md:col-span-1 lg:col-span-3"
            variant={"ghost"}
          >
            Benefits <MoveDown className="ml-1 w-3 h-3" />
          </Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={Tab.COLLECT} className="px-4 py-2 rounded-md border">
        {typeof value === "bigint" && typeof protocolFee === "bigint" ? (
          <div className="p-4 lg:p-6">
            <div className="flex justify-between mb-4 text-gray-400">
              <div>
                <span>
                  {convertWeiToUsdOrEth(
                    value,
                    exchangeRateData?.rates?.ETH
                  ).slice(0, 10)}
                </span>
                <span> {exchangeRateData?.rates?.ETH ? "USD" : "ETH"} X </span>{" "}
                <span className="text-black">{quantity}</span>
              </div>
              <div>mint fee</div>
            </div>
            <div className="flex justify-between mb-4 text-gray-400">
              <div>
                <span>
                  {convertWeiToUsdOrEth(
                    protocolFee,
                    exchangeRateData?.rates?.ETH
                  ).slice(0, 10)}
                </span>
                <span> {exchangeRateData?.rates?.ETH ? "USD" : "ETH"} X </span>
                <span className="text-black">{quantity}</span>
              </div>
              <div>protocol fee</div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-4">
              <p className="text-gray-400">Total cost</p>
              <span>
                {convertWeiToUsdOrEth(
                  (value + protocolFee) * BigInt(quantity),
                  exchangeRateData?.rates?.ETH
                ).slice(0, 10)}
                <span> {exchangeRateData?.rates?.ETH ? "USD" : "ETH"}</span>
              </span>
            </div>
            <div className="flex w-full space-x-4 mb-4 px-12 md:px-4 xl:px-12">
              <Button
                variant={"outline"}
                className="px-2"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                <MinusIcon />
              </Button>
              <Input
                type={"number"}
                className="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              />
              <Button
                variant={"outline"}
                className="px-2"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <PlusIcon />
              </Button>
            </div>
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Button className="w-full">COLLECT</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Collect with your credit card or wallet
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex flex-col gap-2 w-full">
                    <Button
                      className={cn(
                        "w-full",
                        !checkoutLink ? "pointer-events-none bg-gray-600" : ""
                      )}
                      variant="ghost"
                      asChild
                      disabled={!checkoutLink || isCheckoutLinkLoading}
                    >
                      <Link href={checkoutLink || ""}>
                        Collect with Card / ETH
                      </Link>
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (!isLoggedIn) {
                          login();
                        } else {
                          try {
                            writeAsync?.();
                            setHasToasted(false);
                          } catch (e) {
                            // prevent error from crashing the app
                            console.log(e);
                          }
                        }
                      }}
                    >
                      Collect with Optimism {!isLoggedIn ? "(sign in)" : ""}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <p className="text-center pb-4 pt-8 text-gray-700">
              {project.mint_end_date ? (
                <>
                  <span>{getCountdown(new Date(project.mint_end_date))}</span>
                  <DotIcon className="inline" />
                </>
              ) : null}
              {totalSupply !== undefined && (
                <span>{totalSupply.toString()} collected</span>
              )}
            </p>
            <Link
              href={`${chains[0].blockExplorers.etherscan.url}/address/${
                isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS
              }`}
              className="text-gray-500 hover:underline text-center mx-auto w-full block"
              target="_blank"
            >
              contract
            </Link>
          </div>
        ) : (
          <div className="py-4">Not available for collection</div>
        )}
      </TabsContent>
      <TabsContent
        value={Tab.SIGN_UP}
        className="px-8 py-6 pb-10 rounded-md border"
      >
        <SignUpForm id={project._id} />
      </TabsContent>
      <TabsContent
        value={Tab.CONTRIBUTE}
        className="px-4 pt-8 pb-10 rounded-md border"
      >
        <ContributeForm id={project._id} />
      </TabsContent>
      <TabsContent value={Tab.BENEFITS} className="">
        {project.benefits.length ? (
          project.benefits.filter(Boolean).map((benefit) => (
            <div
              key={benefit.text}
              className="mt-4 border rounded-md last:pb-12"
            >
              <h3 className="p-6 text-gray-500">
                Collect <span className="text-black">{benefit.amount}</span> or
                more editions and get
              </h3>
              <hr />
              <Markdown className="p-6 px-10">{benefit.text}</Markdown>
            </div>
          ))
        ) : (
          <div className="p-6 border rounded-md">No benefits found</div>
        )}
      </TabsContent>
    </Tabs>
  );
}
