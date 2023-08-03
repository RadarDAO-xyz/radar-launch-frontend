import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { useRadarEditionsGetEditions } from "@/lib/generated";
import { cn } from "@/lib/utils";
import isTestnet from "@/lib/utils/isTestnet";
import { Button } from "./ui/button";
import { id } from "date-fns/locale";
import { MoveDown } from "lucide-react";
import { useMutation, useQuery } from "wagmi";
import { chains } from "./Web3Provider";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGetProject } from "@/hooks/useGetProject";
import {
  etherUnits,
  formatEther,
  parseEther,
  parseUnits,
  weiUnits,
} from "viem";
import { useRef, useState } from "react";
import { Input } from "./ui/input";

async function getMintCheckoutLink(
  editionId: number,
  value: string, // project's mint fee
  quantity: number
): Promise<string> {
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

  const { toast } = useToast();
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

  console.log({ editionId, value, onChainProjects });

  const { data: checkoutLink, isLoading: isCheckoutLinkLoading } = useQuery(
    ["checkout-mint-link", editionId, value, quantity],
    () => getMintCheckoutLink(editionId!, value!.toString(), quantity),
    {
      enabled:
        editionId !== undefined &&
        value !== undefined &&
        currentTab === Tab.COLLECT,
    }
  );
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
              <div>
                <span>{formatEther(value).slice(0, 6)}</span>
                <span> ETH</span>
                <span> x{quantity}</span>
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
