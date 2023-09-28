import { HeaderHero } from '@/components/HomePage/HeaderHero';
import { InspirationFooter } from '@/components/HomePage/InspirationFooter';
import { ProjectCollection } from '@/components/HomePage/ProjectCollection';
import { Button } from '@/components/ui/button';
import {
  A_MORE_PLAYFUL_FUTURE_POOL_ID,
  CENTAUR_PROEJCT_IDS,
  THE_NEW_PLAYERS_POOL_ID,
  USE_PLAY_TO_BULD_A_BETTER_WEB_POOL_ID,
} from '@/constants/database';
import { useGetProjects } from '@/hooks/useGetProjects';
import { ProjectStatus } from '@/types/mongo';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const ProjectBlock = dynamic(
  () =>
    import('@/components/Layout/ProjectBlock').then((res) => res.ProjectBlock),
  {
    ssr: false,
  },
);

const VisionOfTheWeek = dynamic(
  () =>
    import('@/components/HomePage/VisionOfTheWeek').then(
      (res) => res.VisionOfTheWeek,
    ),
  {
    ssr: false,
  },
);

const PoolHome = dynamic(
  () => import('@/components/PoolPage/PoolHome').then((mod) => mod.PoolHome),
  { ssr: false },
);

export default function HomePage() {
  const { data } = useGetProjects();

  const featuredProject = data?.find(
    (project) => project._id === process.env.FEATURED_PROJECT_ID,
  );
  const usePlayToBuildABetterWebProjects = data
    ?.filter(
      (project) =>
        project.pool === USE_PLAY_TO_BULD_A_BETTER_WEB_POOL_ID &&
        project.status === ProjectStatus.LIVE,
    )
    .sort((a, b) => (new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1))
    .slice(0, 12);
  const curatedByCulture3Projects = data
    ?.filter(
      (project) =>
        project.curation?.start &&
        new Date(project.curation.start) <= new Date() &&
        // if no curation end date, show it indefinitely
        (project.curation?.end || new Date(project.curation.end) >= new Date()),
    )
    // sort by ascending start dates
    .sort(
      (a, b) =>
        new Date(a.curation.start).getTime() -
        new Date(b.curation.start).getTime(),
    )
    .slice(0, 4);
  const theNewPlayersProjects = data
    ?.filter(
      (project) =>
        project.pool === THE_NEW_PLAYERS_POOL_ID &&
        project.status === ProjectStatus.LIVE,
    )
    .sort((a, b) => (new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1))
    .slice(0, 4);
  const centaurProjects = data
    ?.filter((project) => CENTAUR_PROEJCT_IDS.includes(project._id))
    .sort((a, b) => a.edition_price - b.edition_price);

  return (
    <section>
      <div className="absolute left-0 top-[100px] z-10 w-full overflow-hidden whitespace-nowrap font-bolded text-[200px] font-bold leading-none text-gray-100">
        A MORE PLAYFUL FUTURE
      </div>

      {featuredProject !== undefined && (
        <HeaderHero
          visionOfTheWeekSlot={<VisionOfTheWeek {...featuredProject} />}
        />
      )}
      <ProjectCollection
        projectSectionTitle="A MORE PLAYFUL FUTURE PRIZES"
        projectSectionDescription="We're boosting projects with $5000 worth of prizes in September via Buidl Guidl."
        projectSectionButton={
          <>
            <Button className="mr-3 font-bolded" variant={'ghost'} asChild>
              <Link href={`/pool/${A_MORE_PLAYFUL_FUTURE_POOL_ID}`}>
                {'SEE ALL'}
              </Link>
            </Button>
            <Button className="font-bolded font-bold" variant={'ghost'} asChild>
              <Link
                href="https://radarxyz.notion.site/CALL-TO-BUILD-Kernel-x-BuidlGuidl-Monthly-Grant-Pool-Launch-a81e0de4301149f3ae333865cc9bae04?pvs=4"
                target="_blank"
              >
                {'HOW IT WORKS'}
              </Link>
            </Button>
          </>
        }
        projects={
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
            {usePlayToBuildABetterWebProjects?.map((project) => (
              <ProjectBlock key={project._id} {...project} showBelieveButton />
            ))}
          </div>
        }
        curatorSection={
          <div className="flex items-center gap-2">
            Powered by{' '}
            <Link href="https://buidlguidl.com/" target="_blank" rel="noopener">
              <Image
                alt="buidl guidl"
                src="/buidl-guidl.svg"
                width={80}
                height={19}
              />
            </Link>
            x{' '}
            <Link
              href="https://www.kernel.community/en/"
              target="_blank"
              rel="noopener"
            >
              <Image alt="Kernel" src="/kernel.png" width={90} height={52} />
            </Link>
          </div>
        }
      />
      <ProjectCollection
        projectSectionTitle="CURATED BY CULTURE3"
        projectSectionDescription="Culture3 spotlights 4 projects building a better future"
        projects={
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
            {curatedByCulture3Projects?.map((project) => (
              <ProjectBlock key={project._id} {...project} showBelieveButton />
            ))}
          </div>
        }
        curatorSection={
          <div className="flex items-center gap-2">
            <span>Curated By</span>
            <Image
              src="/culture3.svg"
              alt="Culture 3 Logo"
              width={56}
              height={20}
            />
          </div>
        }
      />
      <ProjectCollection
        projectSectionTitle="THE NEW PLAYERS"
        projectSectionButton={
          <Button className="font-bolded font-bold" variant={'ghost'} asChild>
            <Link href={`/pool/${THE_NEW_PLAYERS_POOL_ID}`} target="_blank">
              {'SEE MORE'}
            </Link>
          </Button>
        }
        projects={
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
            {theNewPlayersProjects?.map((project) => (
              <ProjectBlock key={project._id} {...project} showBelieveButton />
            ))}
          </div>
        }
      />
      <ProjectCollection
        projectSectionTitle="OUR CENTAUR FUTURE"
        projectSectionDescription="Support over 10 weeks of collective discovery, exploration and innovation in Cycle #3"
        projectSectionButton={
          <Button className="font-bolded font-bold" variant={'ghost'} asChild>
            <Link href="https://www.radardao.xyz/patron" target="_blank">
              {'READ MORE'}
            </Link>
          </Button>
        }
        projects={
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
            {centaurProjects?.map((project) => (
              <ProjectBlock key={project._id} {...project} showBelieveButton />
            ))}
          </div>
        }
      />
      <PoolHome />
      <InspirationFooter />
    </section>
  );
}
