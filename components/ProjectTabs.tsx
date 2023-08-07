import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { useGetProject } from "@/hooks/useGetProject";
import {
  useRadarEditionsGetEditions,
  useRadarEditionsProtocolFee,
  useRadarEditionsTotalSupply,
} from "@/lib/generated";
import isTestnet from "@/lib/isTestnet";
import { DotIcon, MinusIcon, MoveDown, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "wagmi";
import { Markdown } from "./Markdown";
import { chains } from "./Web3Provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useGetExchangeRate } from "@/hooks/useGetExchangeRate";
import { cn, getCountdown } from "@/lib/utils";
import { convertWeiToUsdOrEth } from "../lib/convertWeiToUsdOrEth";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";

async function getMintCheckoutLink(
  quantity: number,
  editionId?: number,
  value?: string, // project's mint fee,
  title?: string,
  imageUrl?: string,
  projectId?: string
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

enum SupportType {
  SIGN_UP,
  CONTRIBUTE,
}

async function signupProject(projectId: string, email?: string) {
  if (!email) {
    return "";
  }
  try {
    return fetch(
      `${process.env.BACKEND_URL}/projects/${projectId}/supporters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: SupportType.SIGN_UP,
        }),
      }
    ).then((res) => res.json());
  } catch (e) {
    console.error(e);
  }
  return "";
}

async function contributeProject(
  projectId: string,
  social?: string,
  email?: string,
  skillset?: string,
  contribution?: string
) {
  if (!email || !social || !skillset || !contribution) {
    return "";
  }
  try {
    return fetch(
      `${process.env.BACKEND_URL}/projects/${projectId}/supporters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          social,
          skillset,
          contribution,
          type: SupportType.CONTRIBUTE,
        }),
      }
    ).then((res) => res.json());
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

export function ProjectTabs({ id }: { id: string }) {
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
    (project) => project.id === id
  );
  const value =
    editionId !== undefined ? onChainProjects?.[editionId]?.fee : undefined;

  const { data: totalSupply } = useRadarEditionsTotalSupply({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [BigInt(Math.max(editionId!, 0))],
    enabled: Boolean(chains[0]?.id) && editionId !== undefined,
  });
  const { data: exchangeRateData } = useGetExchangeRate("ETH");
  const { data } = useGetProject(id.toString());

  const [currentTab, setCurrentTab] = useState(Tab.BENEFITS);
  const [quantity, setQuantity] = useState(1);
  // TODO: use forms
  const signupInputRef = useRef<HTMLInputElement>(null);

  const socialMediaInputRef = useRef<HTMLInputElement>(null);
  const contributeEmailInputRef = useRef<HTMLInputElement>(null);
  const skillsetInputRef = useRef<HTMLInputElement>(null);
  const contributeTextInputRef = useRef<HTMLInputElement>(null);

  const {
    mutateAsync: signupMutateAsync,
    isSuccess: isSignupSuccess,
    isLoading: isSignupLoading,
  } = useMutation(
    ["signup-project", SupportType.SIGN_UP, id, signupInputRef.current?.value],
    () => signupProject(id, signupInputRef.current?.value)
  );
  const {
    mutateAsync: contributeMutateAsync,
    isSuccess: isContributeSuccess,
    isLoading: isContributeLoading,
  } = useMutation(
    [
      "signup-project",
      SupportType.CONTRIBUTE,
      id,
      signupInputRef.current?.value,
    ],
    () =>
      contributeProject(
        id,
        socialMediaInputRef.current?.value,
        contributeEmailInputRef.current?.value,
        skillsetInputRef.current?.value,
        contributeTextInputRef.current?.value
      )
  );

  const { data: checkoutLink, isLoading: isCheckoutLinkLoading } = useQuery(
    ["checkout-mint-link", editionId, value, quantity],
    () =>
      getMintCheckoutLink(
        quantity,
        editionId,
        (value! + protocolFee!).toString(),
        data?.title,
        generateVideoThumbnail(data?.video_url!),
        data?._id
      ),
    {
      enabled:
        editionId !== undefined &&
        value !== undefined &&
        protocolFee !== undefined &&
        currentTab === Tab.COLLECT &&
        data !== undefined,
    }
  );

  return (
    <Tabs
      defaultValue={Tab.BENEFITS}
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
            <Button
              className={cn(
                "w-full",
                !checkoutLink ? "pointer-events-none bg-gray-600" : ""
              )}
              asChild
              disabled={!checkoutLink || isCheckoutLinkLoading}
            >
              <Link href={checkoutLink || ""}>COLLECT</Link>
            </Button>
            <p className="text-center pb-4 pt-8 text-gray-700">
              {data?.mint_end_date ? (
                <>
                  <span>{getCountdown(new Date(data.mint_end_date))}</span>
                  <DotIcon className="inline" />
                </>
              ) : null}
              {totalSupply !== undefined && (
                <span>{totalSupply.toString()} collected</span>
              )}
            </p>
          </div>
        ) : (
          <div className="py-4">Not available for collection</div>
        )}
      </TabsContent>
      <TabsContent
        value={Tab.SIGN_UP}
        className="px-8 py-6 pb-10 rounded-md border"
      >
        <div>
          <h2 className="text-xl text-center pt-4 pb-6">
            Be the first to use this Project
          </h2>
          {!isSignupSuccess ? (
            <>
              <Input
                ref={signupInputRef}
                placeholder="Enter your email"
                type="email"
                className="mb-4"
              />
              <Button
                className="w-full"
                onClick={() => signupMutateAsync()}
                disabled={isSignupLoading}
              >
                SIGN UP
              </Button>
            </>
          ) : (
            <div className="text-center p-4">
              Thank you! Your submission has been received!
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent
        value={Tab.CONTRIBUTE}
        className="px-4 pt-8 pb-10 rounded-md border"
      >
        <div className="p-4">
          <h2 className="text-xl text-center pb-6">Help Build this Project</h2>
          {!isContributeSuccess ? (
            <>
              <div className="flex sm:space-x-4 space-y-4 sm:space-y-0 mb-4 sm:flex-row flex-col">
                <Input ref={socialMediaInputRef} placeholder="Social Media" />
                <Input
                  ref={contributeEmailInputRef}
                  placeholder="Your email"
                  type="email"
                />
              </div>
              <Input
                ref={skillsetInputRef}
                placeholder="Your skillset"
                className="mb-4"
              />
              <Input
                ref={contributeTextInputRef}
                placeholder="How do you want to contribute?"
                className="mb-4"
              />
              <Button
                className="w-full"
                disabled={isContributeLoading}
                onClick={() => contributeMutateAsync()}
              >
                APPLY
              </Button>
            </>
          ) : (
            <div className="p-4 text-center">
              Thank you! Your submission has been received!
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value={Tab.BENEFITS} className="">
        {data?.benefits.length ? (
          data.benefits.filter(Boolean).map((benefit) => (
            <div key={benefit.text} className="mt-4 border rounded-md last:pb-12">
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
