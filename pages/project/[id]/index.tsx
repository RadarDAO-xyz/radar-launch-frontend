import { Markdown } from "@/components/Markdown";
import { ProjectTabs } from "@/components/ProjectTabs";
import { chains } from "@/components/Web3Provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProject } from "@/hooks/useGetProject";
import { useGetUser } from "@/hooks/useGetUser";
import { generateVideoEmbed } from "@/lib/generateVideoEmbed";
import Link from "next/link";
import { useRouter } from "next/router";

enum Tab {
  ONE = "ONE",
  TWO = "TWO",
}

export default function IndividualProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetProject(id?.toString());
  const { data: userData } = useGetUser(data?.founder);

  if (!id || !data) {
    return (
      <div className="px-[5%] py-20">
        <h1 className="text-3xl text-center">No project found</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 px-[5%] bg-white py-12">
      <div className="md:col-span-4 col-span-1 md:pr-10 md:overflow-y-scroll md:max-h-screen">
        <div>
          {generateVideoEmbed(data?.video_url) !== "" ? (
            <iframe
              width={"100%"}
              className="aspect-video pt-6"
              src={generateVideoEmbed(data?.video_url)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          ) : (
            <div>Invalid project video submitted, {data.video_url}</div>
          )}
        </div>
        <div className="text-lg pt-10 pb-4 text-gray-400">
          The Brief: <span className="font-semibold">{data.brief}</span>
        </div>
        <h2 className="text-3xl pb-4">{data.title}</h2>
        <hr />
        <p className="text-lg pt-6 pb-4 text-gray-500">{data.description}</p>
        {data.tags?.length > 0 && (
          <div className="space-x-2 pb-8">
            <Badge className="bg-gray-600 text-gray-200">
              A More Play-Full Future
            </Badge>
            {data.tags.map((tag) => (
              <Badge variant="secondary" key={tag} className="text-gray-700">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <Tabs defaultValue={Tab.ONE} className="border rounded-lg py-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-8">
            <TabsTrigger value={Tab.ONE}>DETAILS</TabsTrigger>
            <TabsTrigger value={Tab.TWO}>UPDATES</TabsTrigger>
          </TabsList>
          <TabsContent value={Tab.ONE} className="p-8">
            <div className="pb-16">
              <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-8">
                Project TLDR
              </h3>
              <Markdown>{data.tldr}</Markdown>
            </div>
            <hr />
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-8 pt-10">
              Who is the team executing on this project
            </h3>
            {data.team.map((teamMember, index) => (
              <div key={teamMember.name} className="space-y-2 pb-4 last:pb-8">
                <h4 className="font-semibold">
                  {index + 1}. {teamMember.name}
                </h4>
                <Markdown className="text-gray-600">{teamMember.bio}</Markdown>
              </div>
            ))}
            <hr />
            <div className="pb-16 pt-10">
              <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-4">
                This project is looking for:
              </h3>
              {data.collaborators && <Markdown>{data.collaborators}</Markdown>}
            </div>
            <hr />
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16 pt-10">
              Funding Goals
            </h3>
            <Table>
              <TableBody>
                {data?.milestones.map((milestone) => (
                  <TableRow key={milestone.text}>
                    <TableCell className="font-medium text-xl w-[200px] align-top">
                      ${" "}
                      <span className="text-gray-400">
                        {milestone.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="border-l">
                      <Markdown>{milestone.text}</Markdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value={Tab.TWO} className="p-8">
            Coming soon...
          </TabsContent>
        </Tabs>
      </div>
      <div className="md:col-span-2 col-span-1 md:px-4 pt-6 md:overflow-y-scroll md:max-h-screen">
        <div className="flex space-x-2 pb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={userData?.profile || "/default-avatar.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="pb-1">{userData?.name}</p>
            <Link
              href={`${chains[0].blockExplorers.etherscan.url}/address/${data.admin_address}`}
              className="font-mono text-gray-600 hover:underline"
              target="_blank"
            >
              {data.admin_address.slice(0, 10) + "..."}
            </Link>
          </div>
        </div>
        <hr />

        <div className="pt-4 pb-4">
          <ProjectTabs id={id.toString()} />
        </div>
      </div>
    </div>
  );
}
