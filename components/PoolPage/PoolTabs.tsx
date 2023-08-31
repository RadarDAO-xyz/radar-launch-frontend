import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

enum Tab {
  WHY_GRANT_POOLS = 'why-grant-pools',
  GETTING_FUNDED = 'getting-funded',
  CREATING_POOL = 'creating-pool',
}

export function PoolTabs() {
  return (
    <div className={'funding-pool-header'}>
      <div className={'funding-pool-title'}>
        <h1 className={'feature-heading center'}>
          FUNDING THE FUTURE THROUGH GRANT POOLS
        </h1>
      </div>
      <div className={'_20px-div'} />
      <div className="">
        <Tabs defaultValue={Tab.WHY_GRANT_POOLS}>
          <TabsList className="mx-auto mb-6 grid w-full max-w-2xl grid-cols-3 gap-4">
            <TabsTrigger
              className="rounded border-b-0 bg-gray-100 font-normal leading-8 data-[state=active]:bg-gray-200 data-[state=active]:no-underline"
              value={Tab.WHY_GRANT_POOLS}
            >
              Why grant pools
            </TabsTrigger>
            <TabsTrigger
              className="rounded border-b-0 bg-gray-100 font-normal leading-8 data-[state=active]:bg-gray-200 data-[state=active]:no-underline"
              value={Tab.GETTING_FUNDED}
            >
              Getting funded
            </TabsTrigger>
            <TabsTrigger
              className="rounded border-b-0 bg-gray-100 font-normal leading-8 data-[state=active]:bg-gray-200 data-[state=active]:no-underline"
              value={Tab.CREATING_POOL}
            >
              Creating a pool
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={Tab.WHY_GRANT_POOLS}
            className="mx-auto w-full max-w-2xl rounded-lg border p-16 text-center"
          >
            {
              "To accelerate the better futures we believe in, we're collaborating with visionary partners: investors, individuals, blockchains, and brands who have deep conviction in an opportunity space that's inherently linked to one of our futures."
            }
            <br />
            <br />
            {
              "Together, we'll set bespoke briefs with dedicated grant pools to inspire and attract builders to build in answer to the briefs and distribute the funds via RADARLaunch."
            }
            <br />
            <br />
            {
              "Unlike traditional hackathons where only a few projects receive prizes, on Launch 100% of the grant pool will be dispersed among participating builders — with funders able to support as many projects as they'd like until the grant pool is closed."
            }
          </TabsContent>
          <TabsContent
            value={Tab.GETTING_FUNDED}
            className="mx-auto w-full max-w-5xl rounded-lg border p-16 text-center"
          >
            <div className={'pricing-grid'}>
              <div
                className={'pricing-card-three'}
                id={'w-node-_49230e1b-43ad-541c-866d-cdfa85fdae69-85fdae53'}
              >
                <Image
                  className={'image-29'}
                  width={100}
                  height={100}
                  alt="Be inspired by a brief"
                  loading="lazy"
                  src="/inspired.svg"
                />
                <p className={'body-text center'}>{'Be inspired by a brief'}</p>
              </div>
              <div
                className={'pricing-card-three'}
                id={'w-node-_49230e1b-43ad-541c-866d-cdfa85fdae6d-85fdae53'}
              >
                <Image
                  className={'image-29'}
                  width={100}
                  height={100}
                  alt="Submit your vision"
                  loading="lazy"
                  src="/vision.svg"
                />
                <p className={'body-text center'}>{'Submit your vision'}</p>
              </div>
              <div
                className={'pricing-card-three'}
                id={'w-node-_49230e1b-43ad-541c-866d-cdfa85fdae71-85fdae53'}
              >
                <Image
                  className={'image-29'}
                  width={100}
                  height={100}
                  alt="Be inspired by a brief"
                  loading="lazy"
                  src="/inspired.svg"
                />
                <p className={'body-text center'}>{'Launch on the platform'}</p>
              </div>
              <div
                className={'pricing-card-three'}
                id={'w-node-_49230e1b-43ad-541c-866d-cdfa85fdae75-85fdae53'}
              >
                <Image
                  className={'image-29'}
                  width={100}
                  height={100}
                  alt="Get funded from the pool and public"
                  loading="lazy"
                  src="/leaves.svg"
                />
                <p className={'body-text center'}>
                  {'Get funded from the pool and public'}
                </p>
              </div>
            </div>
            <div className={'_20px-div'} />
            <Link
              className={'link-block-6'}
              href="https://radarxyz.notion.site/Funding-Pools-Partner-Briefs-07b0753b0f6f401f9249fe8e0537ef03?pvs=4"
              target="_blank"
            >
              {'Learn more about pools '}
              <span className={'arrow-diagonal'}>{'↗'}</span>
            </Link>
          </TabsContent>
          <TabsContent
            value={Tab.CREATING_POOL}
            className="mx-auto w-full max-w-5xl rounded-lg border p-16 text-center"
          >
            <p className={'body-text center'}>
              {
                'If you’re a visionary builder, investor, individual, blockchain, or brand with deep conviction in an opportunity space you’ve identified and want to influence the energy that’s bubbling up around it, '
              }
              <Link className={'underline'} href="mailto:admin@radardao.xyz">
                {'reach out to us.'}
              </Link>
              <br />
              <br />
              {
                'In this partnership you bring technical expertise and innovation, we bring deep cultural insight by researching the past, present, and future. It’s this combo that makes the partnership magic, and results in ideas that are poised for adoption.'
              }
              <br />
              <br />
              <Link className={'underline'} href="/brief">
                {'Read some examples of our community inspired briefs'}
              </Link>
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
