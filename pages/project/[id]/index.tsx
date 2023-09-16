import { HTMLParsedComponent } from '@/components/Layout/HTMLParsedComponent';
import { Placeholder } from '@/components/Layout/Placeholder';
import { ContributeForm } from '@/components/ProjectPage/ContributeForm';
import { ProjectTabs } from '@/components/ProjectPage/ProjectTabs';
import { SignUpForm } from '@/components/ProjectPage/SignUpForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEFAULT_AVATAR_IMAGE } from '@/constants/links';
import { useGetProject } from '@/hooks/useGetProject';
import { useGetUser } from '@/hooks/useGetUser';
import { generateVideoEmbed } from '@/lib/generateVideoEmbed';
import { isValidVideoLink } from '@/lib/isValidVideoLink';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

enum Tab {
  DETAILS = 'ONE',
  UPDATES = 'TWO',
  SIGNUP_AND_CONTRIBUTE = 'THREE',
}

export default function IndividualProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading: isProjectLoading } = useGetProject(id?.toString());
  const { data: userData, isLoading: isUserLoading } = useGetUser(
    data?.founder,
  );

  if (isProjectLoading || isUserLoading) {
    return (
      <Placeholder>
        <h1>Loading...</h1>
      </Placeholder>
    );
  }

  if (!id || !data) {
    return (
      <Placeholder>
        <h1>No project found</h1>
      </Placeholder>
    );
  }

  return (
    <>
      <NextSeo
        openGraph={{
          type: 'video',
        }}
        twitter={{}}
        title={data.title + ' | RADAR Launch'}
      />
      <Head>
        <meta
          key="twitter:player"
          property="twitter:player"
          content={
            isValidVideoLink(data.video_url || '')
              ? generateVideoEmbed(
                  data.video_url,
                  data.video_url.includes('youtube')
                    ? '?controls=0&fs=0&loop=1&modestbranding=1&playsinline=1&iv_load_policy=3'
                    : '',
                )
              : data.video_url
          }
        />
        <meta
          key="twitter:player:height"
          property="twitter:player:height"
          content="944"
        />
        <meta
          key="twitter:player:width"
          property="twitter:player:width"
          content="531"
        />
      </Head>
      <div className="grid grid-cols-1 bg-white px-[5%] md:grid-cols-6">
        <div className="col-span-1 md:col-span-4 md:max-h-screen md:overflow-y-scroll md:pr-10">
          <div>
            {isValidVideoLink(data.video_url || '') ? (
              <iframe
                width={'100%'}
                className="aspect-video"
                frameBorder={0}
                src={generateVideoEmbed(
                  data.video_url,
                  data.video_url.includes('youtube')
                    ? '?controls=0&fs=0&loop=1&modestbranding=1&playsinline=1&iv_load_policy=3'
                    : '',
                )}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded Project Video"
              />
            ) : (
              <div>Invalid project video submitted, {data.video_url}</div>
            )}
          </div>
          <div className="pb-4 pt-10 text-normal text-gray-400">
            The Brief: <span className="font-semibold">{data.brief}</span>
          </div>
          <h2 className="pb-4 font-base text-3xl">{data.title}</h2>
          <hr />
          <HTMLParsedComponent
            className="pb-4 pt-4 text-normal text-gray-500"
            text={data.description}
          />
          {data.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-8">
              <Badge className="bg-gray-600 px-4 py-1 text-sm text-gray-200 hover:bg-gray-600">
                A More Play-Full Future
              </Badge>
              {data.tags.map((tag) => (
                <Badge
                  variant="secondary"
                  key={tag}
                  className="px-4 py-1 text-sm text-gray-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <Tabs defaultValue={Tab.DETAILS} className="rounded-lg border py-8">
            <TabsList className="grid w-full grid-cols-3 px-8 md:px-14 lg:grid-cols-4">
              <TabsTrigger value={Tab.DETAILS}>DETAILS</TabsTrigger>
              <TabsTrigger value={Tab.UPDATES}>UPDATES</TabsTrigger>
              <TabsTrigger value={Tab.SIGNUP_AND_CONTRIBUTE}>
                SIGN UP & CONTRIBUTE
              </TabsTrigger>
            </TabsList>
            <TabsContent value={Tab.DETAILS} className="px-8 py-6 md:px-14">
              <div className="pb-16">
                <h3 className="pb-8 text-lg font-medium decoration-slate-100">
                  Project TLDR
                </h3>
                <HTMLParsedComponent text={data.tldr} />
              </div>
              <hr />
              <h3 className="pb-8 pt-10 text-lg font-medium decoration-slate-100">
                Who is the team executing on this project
              </h3>
              {data.team.map((teamMember, index) => (
                <div key={teamMember.name} className="space-y-2 pb-4 last:pb-8">
                  <h4 className="font-semibold">{teamMember.name}</h4>
                  <HTMLParsedComponent
                    className="text-gray-600"
                    text={teamMember.bio}
                  />
                </div>
              ))}
              <hr />
              {data.collaborators && (
                <div className="pb-16 pt-10">
                  <h3 className="pb-4 text-lg font-medium decoration-slate-100">
                    This project is looking for:
                  </h3>
                  <HTMLParsedComponent text={data.collaborators} />
                </div>
              )}
              <hr />
              {data?.milestones?.length > 0 && (
                <>
                  <h3 className="pb-16 pt-10 text-lg font-medium decoration-slate-100">
                    Funding Goals
                  </h3>
                  <Table>
                    <TableBody>
                      {data.milestones.map((milestone, index) => (
                        <TableRow key={milestone.text}>
                          <TableCell
                            className={'align-top text-xl font-medium'}
                          >
                            {renderMilestoneAmount(milestone.amount, index)}
                          </TableCell>
                          <TableCell className="border-l">
                            <HTMLParsedComponent text={milestone.text} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </TabsContent>
            <TabsContent value={Tab.UPDATES} className="p-8">
              Coming soon...
            </TabsContent>
            <TabsContent value={Tab.SIGNUP_AND_CONTRIBUTE}>
              <div className="px-8 py-6 pb-10">
                <SignUpForm id={data._id} />
              </div>
              <div className="px-8 py-6 pb-10">
                <ContributeForm id={data._id} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="col-span-1 hidden pt-6 md:col-span-2 md:block md:max-h-screen md:overflow-y-scroll md:px-4">
          <div className="flex space-x-2 pb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={userData?.profile || DEFAULT_AVATAR_IMAGE}
                alt="avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              {userData !== undefined ? (
                <Link
                  href={'/profile/' + userData._id}
                  className="text-[16px] hover:underline"
                >
                  {userData?.name}
                </Link>
              ) : (
                <p className="text-[16px]">{data?.title}</p>
              )}
            </div>
          </div>
          <hr />

          <div className="pb-4 pt-4">
            <ProjectTabs key={data._id} {...data} />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 border bg-white px-[5%] py-4 md:hidden">
        <Sheet modal={false}>
          <SheetTrigger asChild>
            <Button className="w-full">SUPPORT</Button>
          </SheetTrigger>
          <SheetContent side={'bottom'} className="h-full overflow-scroll">
            <div className="flex space-x-2 pb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={userData?.profile || DEFAULT_AVATAR_IMAGE}
                  alt="avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <p className="text-[16px]">{userData?.name}</p>
              </div>
            </div>
            <hr />
            <div>
              <ProjectTabs key={data._id} {...data} />
            </div>
            <SheetFooter className="w-full py-6">
              <SheetClose asChild>
                <Button className="w-full">CLOSE</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function renderMilestoneAmount(
  milestoneAmount: string | number,
  index: number,
) {
  if (
    typeof milestoneAmount === 'number' ||
    !isNaN(+milestoneAmount.replaceAll(',', ''))
  ) {
    return (
      <span className="text-normal">
        ${' '}
        <span className="text-lg text-gray-400">
          {(typeof milestoneAmount === 'number'
            ? milestoneAmount
            : +milestoneAmount.replaceAll(',', '')
          ).toFixed(2)}
        </span>
      </span>
    );
  }

  if (milestoneAmount !== '' && milestoneAmount !== '-') {
    return <span>{milestoneAmount}</span>;
  }

  return `${index + 1}.`;
}
