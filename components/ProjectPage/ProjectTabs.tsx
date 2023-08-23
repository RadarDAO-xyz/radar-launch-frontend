import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useGetCountdown } from '@/hooks/useGetCountdown';
import { useGetExchangeRate } from '@/hooks/useGetExchangeRate';
import { useGetProject } from '@/hooks/useGetProject';
import { useGetUser } from '@/hooks/useGetUser';
import { generateVideoThumbnail } from '@/lib/generateVideoThumbnail';
import {
  usePrepareRadarEditionsMintEdition,
  useRadarEditionsGetEditions,
  useRadarEditionsMintEdition,
  useRadarEditionsProtocolFee,
  useRadarEditionsTotalSupply,
} from '@/lib/generated';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';
import { DotIcon, MinusIcon, MoveDown, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount, useQuery, useWaitForTransaction } from 'wagmi';
import { convertWeiToUsdOrEth } from '../../lib/convertWeiToUsdOrEth';
import { chains } from '../Providers/Web3Provider';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { ContributeForm } from './ContributeForm';
import { SignUpForm } from './SignUpForm';

async function getMintCheckoutLink(
  quantity: number,
  editionId?: number,
  value?: string, // project's mint fee,
  title?: string,
  imageUrl?: string,
  projectId?: string,
  socials?: string,
  payingWithCard: boolean = false,
): Promise<string> {
  if (
    editionId === undefined ||
    value === undefined ||
    title === undefined ||
    imageUrl === undefined
  ) {
    return '';
  }

  try {
    const result = await fetch(`/api/get-mint-checkout-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        editionId,
        value,
        quantity,
        title,
        imageUrl,
        projectId,
        socials,
        payingWithCard,
      }),
    }).then((res) => res.json());

    if ('checkoutLinkIntentUrl' in result) {
      return result.checkoutLinkIntentUrl;
    }
  } catch (e) {
    console.error(e);
  }
  return '';
}

enum Tab {
  COLLECT = 'collect',
  SIGN_UP = 'sign-up',
  CONTRIBUTE = 'contribute',
  BENEFITS = 'benefits',
}

export function ProjectTabs({ id }: { id: string }) {
  const [currentTab, setCurrentTab] = useState(Tab.COLLECT);
  const [quantity, setQuantity] = useState(1);
  const [hasToasted, setHasToasted] = useState(false);

  const { address } = useAccount();
  const { login, isLoggedIn } = useAuth();
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });
  const { data: protocolFee } = useRadarEditionsProtocolFee({
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });

  const editionId: number | undefined = onChainProjects?.findIndex(
    (project) => project.id === id,
  );
  const value =
    editionId !== undefined ? onChainProjects?.[editionId]?.fee : undefined;

  const { data: totalSupply } = useRadarEditionsTotalSupply({
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [BigInt(Math.max(editionId || 0, 0))],
    enabled: Boolean(chains[0]?.id) && editionId !== undefined,
  });
  const { config, error } = usePrepareRadarEditionsMintEdition({
    account: address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    args: [
      BigInt(editionId || 0),
      BigInt(quantity),
      address!,
      '0x0000000000000000000000000000000000000000000000000000000000000000',
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

  const { data: exchangeRateData } = useGetExchangeRate();
  const { data: projectData } = useGetProject(id.toString());
  const { data: userData } = useGetUser(projectData?.founder.toString());
  const countdown = useGetCountdown(
    projectData?.mint_end_date
      ? new Date(projectData.mint_end_date)
      : undefined,
  );

  const { data: checkoutLinkForEth, isLoading: isCheckoutLinkForEthLoading } =
    useQuery(
      [CacheKey.CHECKOUT_MINT_LINK, editionId, value, quantity, false],
      () =>
        getMintCheckoutLink(
          quantity,
          editionId,
          (value! + protocolFee!).toString(),
          projectData?.title,
          generateVideoThumbnail(projectData?.video_url!),
          projectData?._id,
          userData?.socials?.replace('https://twitter.com/', ''),
          false,
        ),
      {
        enabled:
          editionId !== undefined &&
          value !== undefined &&
          protocolFee !== undefined &&
          currentTab === Tab.COLLECT &&
          projectData !== undefined,
      },
    );
  const { data: checkoutLinkForCard, isLoading: isCheckoutLinkForCardLoading } =
    useQuery(
      [CacheKey.CHECKOUT_MINT_LINK, editionId, value, quantity, true],
      () =>
        getMintCheckoutLink(
          quantity,
          editionId,
          (value! + protocolFee!).toString(),
          projectData?.title,
          generateVideoThumbnail(projectData?.video_url!),
          projectData?._id,
          userData?.socials?.replace('https://twitter.com/', ''),
          true,
        ),
      {
        enabled:
          editionId !== undefined &&
          value !== undefined &&
          protocolFee !== undefined &&
          currentTab === Tab.COLLECT &&
          projectData !== undefined,
      },
    );

  const { toast } = useToast();

  useEffect(() => {
    if (isLoading && mintEditionData?.hash) {
      toast({
        title: 'Transaction sent!',
        description: 'Awaiting for confirmation...',
      });
    }
  }, [isLoading, mintEditionData?.hash]);

  useEffect(() => {
    if (isSuccess && mintEditionData?.hash && !hasToasted) {
      toast({
        title: 'Success!',
        description: 'Your NFT has been minted!',
      });
      setHasToasted(true);
    }
  }, [isSuccess, mintEditionData?.hash]);

  return (
    <Tabs
      defaultValue={Tab.COLLECT}
      onValueChange={(e) => setCurrentTab(e as Tab)}
    >
      <TabsList className="grid h-auto w-full grid-cols-2 gap-2 px-0 lg:grid-cols-3">
        <TabsTrigger value={Tab.COLLECT} asChild>
          <Button
            className="col-span-1 w-full border-b-0 !bg-gray-100 p-2 px-4 no-underline hover:!bg-gray-200 data-[state=active]:!bg-gray-300"
            variant={'ghost'}
          >
            Collect <MoveDown className="ml-1 h-3 w-3" />
          </Button>
        </TabsTrigger>
        <TabsTrigger value={Tab.SIGN_UP} asChild>
          <Button
            className="col-span-1 w-full border-b-0 !bg-gray-100 p-2 px-4 no-underline hover:!bg-gray-200 data-[state=active]:!bg-gray-300"
            variant={'ghost'}
          >
            Sign Up <MoveDown className="ml-1 h-3 w-3" />
          </Button>
        </TabsTrigger>
        <TabsTrigger value={Tab.CONTRIBUTE} asChild>
          <Button
            className="col-span-1 w-full border-b-0 !bg-gray-100 p-2 px-4 no-underline hover:!bg-gray-200 data-[state=active]:!bg-gray-300"
            variant={'ghost'}
          >
            Contribute <MoveDown className="ml-1 h-3 w-3" />
          </Button>
        </TabsTrigger>
        <TabsTrigger value={Tab.BENEFITS} asChild>
          <Button
            className="w-full border-b-0 !bg-gray-100 p-2 px-4 no-underline hover:!bg-gray-200 data-[state=active]:!bg-gray-300 md:col-span-1 lg:col-span-3"
            variant={'ghost'}
          >
            Benefits <MoveDown className="ml-1 h-3 w-3" />
          </Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={Tab.COLLECT} className="rounded-md border px-4 py-2">
        {typeof value === 'bigint' && typeof protocolFee === 'bigint' ? (
          <div className="p-4 lg:p-6">
            <div className="mb-4 flex justify-between text-gray-400">
              <div>
                <span>
                  $
                  {Math.round(
                    parseFloat(
                      convertWeiToUsdOrEth(
                        value,
                        exchangeRateData?.ethereum?.usd,
                      ),
                    ),
                  ).toString()}
                </span>
                <span>
                  {' '}
                  {exchangeRateData?.ethereum?.usd ? 'USD' : 'ETH'} X{' '}
                </span>{' '}
                <span className="text-black">{quantity}</span>
              </div>
              <div>mint fee</div>
            </div>
            <div className="mb-4 flex justify-between text-gray-400">
              <div>
                <span>
                  $
                  {Math.round(
                    parseFloat(
                      convertWeiToUsdOrEth(
                        protocolFee,
                        exchangeRateData?.ethereum?.usd,
                      ),
                    ),
                  ).toString()}
                </span>
                <span>
                  {' '}
                  {exchangeRateData?.ethereum?.usd ? 'USD' : 'ETH'} X{' '}
                </span>
                <span className="text-black">{quantity}</span>
              </div>
              <div>protocol fee</div>
            </div>
            <hr className="my-4" />
            <div className="mb-4 flex justify-between">
              <p className="text-gray-400">Total cost</p>
              <span>
                $
                {Math.round(
                  parseFloat(
                    convertWeiToUsdOrEth(
                      (value + protocolFee) * BigInt(quantity),
                      exchangeRateData?.ethereum?.usd,
                    ),
                  ),
                ).toString()}
                <span> {exchangeRateData?.ethereum?.usd ? 'USD' : 'ETH'}</span>
              </span>
            </div>
            <div className="mb-4 flex w-full space-x-4 px-12 md:px-4 xl:px-12">
              <Button
                variant={'outline'}
                className="px-2"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                <MinusIcon />
              </Button>
              <Input
                type={'number'}
                className="text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              />
              <Button
                variant={'outline'}
                className="px-2"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <PlusIcon />
              </Button>
            </div>
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Button
                  className="w-full"
                  disabled={
                    projectData?.mint_end_date
                      ? new Date(projectData.mint_end_date) < new Date()
                      : false
                  }
                >
                  COLLECT
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Collect with your credit card or wallet
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex w-full flex-col gap-2">
                    <Button
                      className={cn(
                        'w-full',
                        !checkoutLinkForCard
                          ? 'pointer-events-none opacity-70'
                          : '',
                      )}
                      asChild
                      disabled={
                        !checkoutLinkForCard || isCheckoutLinkForCardLoading
                      }
                    >
                      <Link href={checkoutLinkForCard || ''}>
                        Collect with Credit Card
                      </Link>
                    </Button>
                    <Button
                      className={cn(
                        'w-full',
                        !checkoutLinkForEth
                          ? 'pointer-events-none opacity-70'
                          : '',
                      )}
                      asChild
                      disabled={
                        !checkoutLinkForEth || isCheckoutLinkForEthLoading
                      }
                    >
                      <Link href={checkoutLinkForEth || ''}>
                        Collect with ETH
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
                          if (error) {
                            toast({
                              variant: 'destructive',
                              title: 'An unexpected error occured',
                              description:
                                'Check the console for more information',
                            });
                          }
                        }
                      }}
                    >
                      Collect with Optimism {!isLoggedIn ? '(sign in)' : ''}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <p className="pb-4 pt-8 text-center text-gray-700">
              {projectData?.mint_end_date &&
              new Date(projectData.mint_end_date) > new Date() ? (
                <>
                  <span>{countdown}</span>
                  <DotIcon className="inline" />
                </>
              ) : null}
              {totalSupply !== undefined && (
                <span>
                  {(
                    totalSupply + BigInt(projectData?.supporter_count || 0)
                  ).toString()}{' '}
                  supporters
                </span>
              )}
            </p>
            <Link
              href={`${chains[0].blockExplorers.etherscan.url}/address/${CONTRACT_ADDRESS}`}
              className="mx-auto block w-full text-center text-gray-500 hover:underline"
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
        className="rounded-md border px-8 py-6 pb-10"
      >
        <SignUpForm id={id} />
      </TabsContent>
      <TabsContent
        value={Tab.CONTRIBUTE}
        className="rounded-md border px-4 pb-10 pt-8"
      >
        <ContributeForm id={id} />
      </TabsContent>
      <TabsContent value={Tab.BENEFITS} className="">
        {projectData?.benefits.length ? (
          projectData.benefits.filter(Boolean).map((benefit) => (
            <div
              key={benefit.text}
              className="mt-4 rounded-md border last:pb-12"
            >
              <h3 className="p-6 text-gray-500">
                Collect <span className="text-black">{benefit.amount}</span> or
                more editions and get
              </h3>
              <hr />
              <div className="p-6 px-10">{parse(benefit.text)}</div>
            </div>
          ))
        ) : (
          <div className="rounded-md border p-6">No benefits found</div>
        )}
      </TabsContent>
    </Tabs>
  );
}
