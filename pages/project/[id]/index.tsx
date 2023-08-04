import { ProjectTabs } from "@/components/ProjectTabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProject } from "@/hooks/useGetProject";
import { useGetUser } from "@/hooks/useGetUser";
import { generateVideoEmbed } from "@/lib/generateVideoEmbed";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { chains } from "@/components/Web3Provider";

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
    <div className="grid grid-cols-6 px-[5%] bg-white py-12">
      <div className="col-span-4 pr-10 overflow-y-scroll max-h-screen">
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
        <div className="text-lg pt-10 pb-4">
          The Brief: <span className="font-semibold">{data.brief}</span>
        </div>
        <h2 className="text-3xl pb-4">{data.title}</h2>
        <hr />
        <p className="text-lg py-6">This is some text inside of a div block.</p>
        <Tabs defaultValue={Tab.ONE} className="border py-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value={Tab.ONE}>DETAILS</TabsTrigger>
            <TabsTrigger value={Tab.TWO}>UPDATES</TabsTrigger>
          </TabsList>
          <TabsContent value={Tab.ONE} className="p-8">
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16">
              Project TLDR
            </h3>
            <ReactMarkdown>{data.tldr}</ReactMarkdown>
            <hr />
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16 pt-10">
              Who is the team executing on this vision
            </h3>
            {data.team.map((teamMember, index) => (
              <div key={teamMember.name} className="space-y-2 pb-4">
                <h4 className="font-semibold">
                  {index + 1}. {teamMember.name}
                </h4>
                <ReactMarkdown className="text-gray-600">
                  {teamMember.bio}
                </ReactMarkdown>
              </div>
            ))}
            <hr />
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16 pt-10">
              This project is looking for:
            </h3>
            <hr />
            {data.collaborators && (
              <ReactMarkdown>{data.collaborators}</ReactMarkdown>
            )}
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16 pt-10">
              Funding Goals
            </h3>
            <Table>
              <TableBody>
                {data?.milestones.map((milestone) => (
                  <TableRow key={milestone.text}>
                    <TableCell className="font-medium text-xl w-[200px]">
                      ${" "}
                      <span className="text-gray-400 text">
                        {milestone.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="border-l">{milestone.text}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value={Tab.TWO}></TabsContent>
        </Tabs>
      </div>
      <div className="col-span-2 px-4 pt-6 overflow-y-scroll max-h-screen">
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
