import { HTMLParsedComponent } from '@/components/Layout/HTMLParsedComponent';
import { Placeholder } from '@/components/Layout/Placeholder';
import { ProjectVideoPlayer } from '@/components/Layout/ProjectVideoPlayer';
import { ContributeForm } from '@/components/ProjectPage/ContributeForm';
import { ProjectDescription } from '@/components/ProjectPage/ProjectDescription';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEFAULT_AVATAR_IMAGE } from '@/constants/links';
import { useGetProject } from '@/hooks/useGetProject';
import { useGetUser } from '@/hooks/useGetUser';
import { generateVideoEmbed } from '@/lib/generateVideoEmbed';
import { isYoutubeOrVimeoVideoLink } from '@/lib/isYoutubeOrVimeoVideoLink';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Project } from '@/types/mongo';
import { getProject, getUser } from '@/lib/backend';

export const getServerSideProps = (async (context) => {
  const id = context.params?.id as string;
  const project_data = await getProject(id!);
  const user_data = await getUser(project_data.founder!);
  return { props: { project: project_data, user: user_data } };
}) satisfies GetServerSideProps<{
  project: Project | undefined;
  user: Awaited<ReturnType<typeof getUser>>;
}>;

enum Tab {
  DETAILS = 'ONE',
  UPDATES = 'TWO',
  SIGNUP_AND_CONTRIBUTE = 'THREE',
}

export default function IndividualProjectPage({
  project: _project,
  user: _user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading: isProjectLoading } = useGetProject(
    id?.toString(),
    _project,
  );
  const { data: userData, isLoading: isUserLoading } = useGetUser(
    data?.founder,
    _user,
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
          images: [{ url: data.thumbnail ?? '' }],
          title: data.title + ' | RADAR Launch',
          description: data.description,
        }}
        twitter={{}}
        title={data.title + ' | RADAR Launch'}
      />
      <Head>
        <meta
          key="twitter:player"
          property="twitter:player"
          content={
            isYoutubeOrVimeoVideoLink(data.video_url || '')
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
            <ProjectVideoPlayer videoUrl={data.video_url} title={data.title} />
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
              <ProjectDescription {...data} />
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
                  href={'/profile/' + userData.wallets[0]}
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
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              <ProjectTabs
                key={data._id}
                {...data}
                closeSheet={() => setIsOpen(false)}
              />
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
