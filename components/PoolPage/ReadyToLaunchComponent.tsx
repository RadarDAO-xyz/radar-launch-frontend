import React from 'react';
import { cn } from '@/lib/utils';

export function ReadyToLaunchComponent() {
  return (
    <section className={cn('section', 'top-line')}>
      <div className={'px-[5%]'}>
        <h2 className={cn('heading-25 pb-8')}>{'Ready to launch?'}</h2>
        <div
          className={cn(
            'mx-auto grid max-w-[300px] grid-cols-1 items-stretch justify-around gap-10 md:max-w-full lg:grid-cols-5',
          )}
        >
          <div
            className={cn('pricing-card-three w-full')}
            id={cn('w-node-eabcc396-b4d7-fd44-0fcc-1f2698d1552f-98d1552a')}
          >
            <img
              className={cn('pricing-image px-4')}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480802c0e353e906c43dd3a_Brief_single.png"
            />
            <h3 className={cn('border-b-2 pb-1 pt-10 text-lg')}>
              {'Be inspired'}
            </h3>
            <p className={cn('body-text', 'center mt-5 w-3/4')}>
              {
                'Receive inspiration and insight from the RADAR community and partners'
              }
            </p>
          </div>
          <div
            className={cn('pricing-card-three w-full')}
            id={cn('w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15535-98d1552a')}
          >
            <img
              className={cn('pricing-image px-4')}
              loading="lazy"
              width={100}
              height={100}
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/648087d8889d8922b98f1441_submit%20vision_2.png"
            />
            <h3 className="border-b-2 pb-1 pt-10 text-lg">
              {'Share your vision'}
            </h3>
            <p className={cn('body-text', 'center mt-5 w-3/4')}>
              {
                'Submit a video proposal (less than 3 mins) and set your milestones'
              }
            </p>
          </div>
          <div
            className={cn('pricing-card-three w-full')}
            id={cn('w-node-eabcc396-b4d7-fd44-0fcc-1f2698d1553b-98d1552a')}
          >
            <img
              className={cn('pricing-image px-4')}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64808ab90c4bfc697c1a478e_submission%20icons.png"
            />
            <h3 className="border-b-2 pb-1 pt-10 text-lg">
              {'Receive validation'}
            </h3>
            <p className={cn('body-text', 'center mt-5 w-3/4')}>
              {
                "Receive an approval decision within 48 hours from RADAR's curation crew"
              }
            </p>
          </div>
          <div
            className={cn('pricing-card-three w-full')}
            id={cn('w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15541-98d1552a')}
          >
            <img
              className={cn('pricing-image px-4')}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480d007b8df65a9d406feeb_Artboard%201.png"
            />
            <h3 className="border-b-2 pb-1 pt-10 text-lg">{'Get support'}</h3>
            <p className={cn('body-text', 'center mt-5 w-3/4')}>
              {
                'Share your project page to attract users, contributors, and funding onchain'
              }
            </p>
          </div>
          <div
            className={cn('pricing-card-three w-full')}
            id={cn('w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15547-98d1552a')}
          >
            <img
              className={cn('pricing-image px-4')}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480dc87dff309c9a60279b0_Artboard%203.png"
            />
            <h3 className="border-b-2 pb-1 pt-10 text-lg">
              {'Make the future'}
            </h3>
            <p className={cn('body-text', 'center mt-5 w-3/4')}>
              {'Withdraw your crowdfunded ETH to achieve your first milestone'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
