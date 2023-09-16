import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useGetCountdown } from '@/hooks/useGetCountdown';
import { useGetExchangeRate } from '@/hooks/useGetExchangeRate';
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
import { Project } from '@/types/mongo';
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
import { BelieveTabContent } from './BelieveTabContent';
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
  BELIEVE = 'believe',
  COLLECT = 'collect',
}

export function ProjectTabs({
  _id,
  tags,
  founder,
  mint_end_date,
  title,
  video_url,
}: Project) {
  const [currentTab, setCurrentTab] = useState(Tab.BELIEVE);
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

  const editionId: number | undefined = onChainProjects?.findLastIndex(
    (project) => project.id === _id,
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
  const {
    data: mintEditionData,
    writeAsync,
    error: mintEditionError,
  } = useRadarEditionsMintEdition(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: mintEditionData?.hash,
    enabled: mintEditionData?.hash !== undefined,
  });

  const { data: exchangeRateData } = useGetExchangeRate();
  const { data: userData } = useGetUser(founder.toString());
  const countdown = useGetCountdown(
    mint_end_date ? new Date(mint_end_date) : undefined,
  );

  const { data: checkoutLinkForEth, isLoading: isCheckoutLinkForEthLoading } =
    useQuery(
      [CacheKey.CHECKOUT_MINT_LINK, editionId, value, quantity, false],
      () =>
        getMintCheckoutLink(
          quantity,
          editionId,
          (value! + protocolFee!).toString(),
          title,
          generateVideoThumbnail(video_url!),
          _id,
          userData?.socials?.replace('https://twitter.com/', ''),
          false,
        ),
      {
        enabled:
          editionId !== undefined &&
          value !== undefined &&
          protocolFee !== undefined &&
          currentTab === Tab.COLLECT,
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
          title,
          generateVideoThumbnail(video_url!),
          _id,
          userData?.socials?.replace('https://twitter.com/', ''),
          true,
        ),
      {
        enabled:
          editionId !== undefined &&
          value !== undefined &&
          protocolFee !== undefined &&
          currentTab === Tab.COLLECT,
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
      defaultValue={Tab.BELIEVE}
      onValueChange={(e) => setCurrentTab(e as Tab)}
    >
      <TabsList className="grid h-auto w-full grid-cols-2 gap-2 px-0 lg:grid-cols-2">
        <TabsTrigger value={Tab.BELIEVE} asChild>
          <Button
            className="col-span-1 w-full border-b-0 !bg-gray-100 p-2 px-4 no-underline hover:!bg-gray-200 data-[state=active]:!bg-gray-300"
            variant={'ghost'}
          >
            Believe <MoveDown className="ml-1 h-3 w-3" />
          </Button>
        </TabsTrigger>
        <TabsTrigger value={Tab.COLLECT} asChild>
          <Button
            className="col-span-1 w-full border-b-0 !bg-gray-100 p-2 px-4 no-underline hover:!bg-gray-200 data-[state=active]:!bg-gray-300"
            variant={'ghost'}
          >
            Collect <MoveDown className="ml-1 h-3 w-3" />
          </Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value={Tab.BELIEVE}
        className="rounded-md border px-8 py-6 pb-10"
      >
        <BelieveTabContent
          id={_id}
          editionId={editionId}
          tags={tags.join(',')}
        />
      </TabsContent>
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
                    mint_end_date ? new Date(mint_end_date) < new Date() : false
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
                          if (error || mintEditionError) {
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
              {mint_end_date && new Date(mint_end_date) > new Date() ? (
                <>
                  <span>{countdown}</span>
                  <DotIcon className="inline" />
                </>
              ) : null}
              {totalSupply !== undefined && (
                <span>{totalSupply.toString()} collectors</span>
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
    </Tabs>
  );
}
