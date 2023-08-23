import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function PreLaunchFooter() {
  return (
    <footer className="footer">
      <div>
        <div className="w-[100px]">
          <img
            className="image-5 invert"
            loading="lazy"
            width={'auth'}
            height={'auto'}
            src="/logo.png"
          />
        </div>
      </div>
      <div className="_20px-div" />
      <div className="div-block-107">
        <div className="div-block-108">
          <p className="body-text white">
            {
              'RADAR Launch is a crowdraising platform for future makers and early adopters.'
            }
            <br />
            <br />
            RADAR Launch is 100% owned and built by the{' '}
            <Link
              className="text-white underline transition-colors hover:text-white/80"
              href="https://www.radardao.xyz/"
              target="_blank"
            >
              RADAR
            </Link>{' '}
            community.
            <br />
            <br />
            {'Read our "Multiplayer Futures" lite paper'}{' '}
            <Link
              href="https://www.radardao.xyz/multiplayer-futures"
              target="_blank"
              className="text-white underline transition-colors hover:text-white/80"
            >
              here
            </Link>
            .
          </p>
        </div>
        <ul className="footer-list ml-0">
          <li className="footer-list-item right">
            <Link
              className="black-link hover:underline"
              href="https://airtable.com/appGvDqIhUSP0caqo/shrvi09PTUP5mTSHN"
              target="_blank"
            >
              {'Submit a project'}
            </Link>
            <ChevronRight className="ml-1 h-4 w-4 text-white" />
          </li>
          <li className="footer-list-item right">
            <Link
              className="black-link hover:underline"
              href="https://radarxyz.notion.site/Funding-Pools-Partner-Briefs-07b0753b0f6f401f9249fe8e0537ef03?pvs=4"
              target="_blank"
            >
              {'Sponsor a brief'}
            </Link>{' '}
            <ChevronRight className="ml-1 h-4 w-4 text-white" />
          </li>
          <li className="footer-list-item right">
            <Link
              className="black-link hover:underline"
              href="https://airtable.com/appX7pDZw5NAGWoLc/shrFKUzeNpJoDU0x9"
              target="_blank"
            >
              {'Apply to join a community'}
            </Link>{' '}
            <ChevronRight className="ml-1 h-4 w-4 text-white" />
          </li>
        </ul>
      </div>
      <div className="_20px-div" />
      <div className="div-block-16 space-y-2 sm:space-y-0">
        <p className="body-text white">
          {'© 2023 RADAR Community Labs. All rights reserved'}
        </p>
        <Link
          className="body-text white text-right hover:underline"
          href="https://www.launch.radardao.xyz/terms-and-conditions"
          target="_blank"
        >
          {'Terms of Service'}
        </Link>
      </div>
    </footer>
  );
}
