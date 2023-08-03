import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { useGetProject } from "@/hooks/useGetProject";
import { useRadarEditionsGetEditions } from "@/lib/generated";
import isTestnet from "@/lib/utils/isTestnet";
import { MinusIcon, MoveDown, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { formatEther } from "viem";
import { useMutation, useQuery } from "wagmi";
import { chains } from "./Web3Provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

async function getMintCheckoutLink(
  quantity: number,
  editionId?: number,
  value?: string // project's mint fee
): Promise<string> {
  if (editionId === undefined || value === undefined) {
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
    const result = await fetch(
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
    const result = await fetch(
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

  const editionId = onChainProjects?.findIndex((project) => project.id === id);
  const value = editionId !== undefined && onChainProjects?.[editionId]?.fee;

  const { data: checkoutLink, isLoading: isCheckoutLinkLoading } = useQuery(
    ["checkout-mint-link", editionId, value, quantity],
    () => getMintCheckoutLink(quantity, editionId, value?.toString()),
    {
      enabled:
        editionId !== undefined &&
        value !== undefined &&
        currentTab === Tab.COLLECT,
    }
  );

  console.log({ editionId, value, onChainProjects, checkoutLink });
  return (
    <div>
      <div className="">
        <Tabs
          defaultValue={Tab.BENEFITS}
          onValueChange={(e) => setCurrentTab(e as Tab)}
        >
          <TabsList className="flex flex-col w-full space-y-2 h-auto">
            <div className="flex w-full space-x-2">
              <TabsTrigger value={Tab.COLLECT} asChild>
                <Button
                  className="border-b-0 no-underline p-2 px-4 !bg-gray-100 hover:!bg-gray-200 w-full data-[state=active]:!bg-gray-300"
                  variant={"ghost"}
                >
                  Collect <MoveDown className="ml-1 w-3 h-3" />
                </Button>
              </TabsTrigger>
              <TabsTrigger value={Tab.SIGN_UP} asChild>
                <Button
                  className="border-b-0 no-underline p-2 px-4 !bg-gray-100 hover:!bg-gray-200 w-full data-[state=active]:!bg-gray-300"
                  variant={"ghost"}
                >
                  Sign Up <MoveDown className="ml-1 w-3 h-3" />
                </Button>
              </TabsTrigger>
              <TabsTrigger value={Tab.CONTRIBUTE} asChild>
                <Button
                  className="border-b-0 no-underline p-2 px-4 !bg-gray-100 hover:!bg-gray-200 w-full data-[state=active]:!bg-gray-300"
                  variant={"ghost"}
                >
                  Contribute <MoveDown className="ml-1 w-3 h-3" />
                </Button>
              </TabsTrigger>
            </div>
            <TabsTrigger value={Tab.BENEFITS} asChild>
              <Button
                className="border-b-0 no-underline p-2 px-4 !bg-gray-100 hover:!bg-gray-200 w-full data-[state=active]:!bg-gray-300"
                variant={"ghost"}
              >
                Benefits <MoveDown className="ml-1 w-3 h-3" />
              </Button>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={Tab.COLLECT} className="px-4 py-2 rounded border">
            {typeof value === "bigint" ? (
              <div className="p-4">
                <div className="flex justify-between mb-4 text-gray-400">
                  <div>
                    <span>{formatEther(value).slice(0, 6)}</span>
                    <span> ETH X </span>
                    <span className="text-black">{quantity}</span>
                  </div>
                  <div>total</div>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-4">
                  <p className="text-gray-400">Total cost</p>
                  <span>
                    {formatEther(value * BigInt(quantity)).slice(0, 6)} ETH
                  </span>
                </div>
                <div className="flex w-full space-x-4 mb-4 px-12">
                  <Button
                    variant={"outline"}
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    <MinusIcon />
                  </Button>
                  <Input
                    type={"number"}
                    value={quantity}
                    onChange={(e) => setQuantity(+e.target.value)}
                  />
                  <Button
                    variant={"outline"}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                <Button
                  className="w-full"
                  asChild
                  disabled={!checkoutLink || isCheckoutLinkLoading}
                >
                  <Link href={checkoutLink || ""}>Collect</Link>
                </Button>
              </div>
            ) : (
              <div>Not available for collection</div>
            )}
          </TabsContent>
          <TabsContent value={Tab.SIGN_UP} className="px-4 py-2 rounded border">
            <div>
              <h2 className="text-xl text-center py-6">
                Be the first to use this Vision
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
                    Sign Up
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
            className="px-4 py-2 rounded border"
          >
            <div>
              <h2 className="text-xl text-center py-6">
                Help Build this Vision
              </h2>
              {!isContributeSuccess ? (
                <>
                  <div className="flex space-x-4 mb-4">
                    <Input
                      ref={socialMediaInputRef}
                      placeholder="Social Media"
                    />
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
                    Apply
                  </Button>
                </>
              ) : (
                <div className="p-4 text-center">
                  Thank you! Your submission has been received!
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent
            value={Tab.BENEFITS}
            className="px-4 py-2 rounded border"
          >
            {data?.benefits.length ? (
              data.benefits.map((benefit) => (
                <div key={benefit.text} className="mt-4 border rounded">
                  <h3 className="p-4">
                    Collect {benefit.amount} or more editions and get
                  </h3>
                  <hr />
                  <p className="p-4">{benefit.text}</p>
                </div>
              ))
            ) : (
              <div>No benefits found</div>
            )}
          </TabsContent>
        </Tabs>
        {/* <Button className="w-full" variant={"ghost"} asChild disabled={isCheckoutLinkLoading || !checkoutLink}>
        <Link href={checkoutLink || ""} className={cn(isCheckoutLinkLoading || !checkoutLink ? "pointer-events-none opacity-70" : "")} onClick={() => {
          if (checkoutLink) {
            toast({
              title: "Redirecting to checkout"
            })
          }
        }}>

        </Link>
      </Button>
      <Button className="w-full" variant={"ghost"}>
      </Button>
      <Button className="w-full" variant={"ghost"}>
      </Button> */}
      </div>
    </div>
  );
}
