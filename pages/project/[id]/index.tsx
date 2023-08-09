import { Markdown } from "@/components/Markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProject, getUser } from "@/lib/backend";
import { generateVideoEmbed } from "@/lib/generateVideoEmbed";
import { cn } from "@/lib/utils";
import { Project, User } from "@/types/mongo";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

enum Tab {
  DETAILS = "ONE",
  UPDATES = "TWO",
}

export const getServerSideProps: GetServerSideProps<{
  user: User | null;
  project: Project | null;
}> = async (context) => {
  const { id } = context.query;
  let project: Project | null = null;
  let user: User | null = null;
  if (id === undefined) {
    return {
      props: { project, user },
    };
  }
  try {
    project = await getProject(id.toString());

    if (project?.founder) {
      user = await getUser(project.founder);
    }

    return { props: { project, user } };
  } catch (e) {
    console.error(e);
    return {
      props: { project, user },
    };
  }
};

const ProjectTabsNoSSR = dynamic(
  () =>
    import("@/components/ProjectPage/ProjectTabs").then(
      (mod) => mod.ProjectTabs
    ),
  {
    ssr: false,
  }
);

export default function IndividualProjectPage({
  project,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id } = router.query;

  if (!id || project === null) {
    return (
      <div className="px-[5%] py-20">
        <h1 className="text-3xl text-center">No project found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 px-[5%] bg-white">
        <div className="md:col-span-4 col-span-1 md:pr-10 md:overflow-y-scroll md:max-h-screen">
          <div>
            {generateVideoEmbed(project?.video_url) !== "" ? (
              <iframe
                width={"100%"}
                className="aspect-video"
                src={generateVideoEmbed(project?.video_url)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded Project Video"
              />
            ) : (
              <div>Invalid project video submitted, {project.video_url}</div>
            )}
          </div>
          <div className="text-normal pt-10 pb-4 text-gray-400">
            The Brief: <span className="font-semibold">{project.brief}</span>
          </div>
          <h2 className="text-3xl pb-4 font-base">{project.title}</h2>
          <hr />
          <p className="text-normal pt-4 pb-4 text-gray-500">
            {project.description}
          </p>
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-8">
              <Badge className="bg-gray-600 hover:bg-gray-600 text-gray-200 text-sm px-4 py-1">
                A More Play-Full Future
              </Badge>
              {project.tags.map((tag) => (
                <Badge
                  variant="secondary"
                  key={tag}
                  className="text-gray-700 text-sm px-4 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <Tabs defaultValue={Tab.DETAILS} className="border rounded-lg py-6">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-8">
              <TabsTrigger value={Tab.DETAILS}>DETAILS</TabsTrigger>
              <TabsTrigger value={Tab.UPDATES}>UPDATES</TabsTrigger>
            </TabsList>
            <TabsContent value={Tab.DETAILS} className="px-10 py-6">
              <div className="pb-16">
                <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-8">
                  Project TLDR
                </h3>
                <Markdown>{project.tldr}</Markdown>
              </div>
              <hr />
              <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-8 pt-10">
                Who is the team executing on this project
              </h3>
              {project.team.map((teamMember, index) => (
                <div key={teamMember.name} className="space-y-2 pb-4 last:pb-8">
                  <h4 className="font-semibold">
                    {index + 1}. {teamMember.name}
                  </h4>
                  <Markdown className="text-gray-600">
                    {teamMember.bio}
                  </Markdown>
                </div>
              ))}
              <hr />
              <div className="pb-16 pt-10">
                <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-4">
                  This project is looking for:
                </h3>
                {project.collaborators && (
                  <Markdown>{project.collaborators}</Markdown>
                )}
              </div>
              <hr />
              <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16 pt-10">
                Funding Goals
              </h3>
              <Table>
                <TableBody>
                  {project?.milestones.map((milestone, index) => (
                    <TableRow key={milestone.text}>
                      <TableCell
                        className={cn(
                          "font-medium text-xl align-top",
                          typeof milestone.amount === "number"
                            ? "w-[200px]"
                            : "w-[60px]"
                        )}
                      >
                        {typeof milestone.amount === "number" ? (
                          <span className="text-normal">
                            ${" "}
                            <span className="text-gray-400 text-lg">
                              {milestone.amount.toFixed(2)}
                            </span>
                          </span>
                        ) : (
                          `${index + 1}.`
                        )}
                      </TableCell>
                      <TableCell className="border-l">
                        <Markdown>{milestone.text}</Markdown>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value={Tab.UPDATES} className="p-8">
              Coming soon...
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:col-span-2 col-span-1 md:px-4 pt-6 md:overflow-y-scroll md:max-h-screen hidden md:block">
          <div className="flex space-x-2 pb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={user?.profile || "/default-avatar.png"}
                className="object-contain"
                alt="avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              {user?.socials ? (
                <Link
                  href={user.socials}
                  target="_blank"
                  className="text-[16px] hover:underline"
                >
                  {user?.name}
                </Link>
              ) : (
                <p className="text-[16px]">{user?.name}</p>
              )}
            </div>
          </div>
          <hr />

          <div className="pt-4 pb-4">
            <ProjectTabsNoSSR key={project._id} project={project} user={user} />
          </div>
        </div>
      </div>
      <div className="md:hidden bottom-0 px-[5%] border py-4 bg-white sticky">
        <Sheet modal={false}>
          <SheetTrigger asChild>
            <Button className="w-full">SUPPORT</Button>
          </SheetTrigger>
          <SheetContent side={"bottom"} className="h-full overflow-scroll">
            <div className="flex space-x-2 pb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={user?.profile || "/default-avatar.png"}
                  className="object-contain"
                  alt="avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <p className="text-[16px]">{user?.name}</p>
              </div>
            </div>
            <hr />
            <div>
              <ProjectTabsNoSSR
                key={project._id}
                project={project}
                user={user}
              />
            </div>
            <SheetFooter className="w-full py-6">
              <SheetClose asChild>
                <Button>CLOSE</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
