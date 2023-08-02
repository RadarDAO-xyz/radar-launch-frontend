import { chains } from "@/components/Web3Provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GOERLI_CONTRACT_ADDRESS, MAINNET_CONTRACT_ADDRESS } from "@/constants/address";
import { useGetProject } from "@/hooks/useGetProject";
import { useGetUser } from "@/hooks/useGetUser";
import { useRadarEditionsGetEditions } from "@/lib/generated";
import isTestnet from "@/lib/utils/isTestnet";
import { MoveDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "wagmi";

enum Tab {
  ONE = "ONE",
  TWO = "TWO",
}

function transformYouTubeUrl(url: string) {
  if (!url.includes("youtube")) {
    return ""
  }
  if (!url.includes("embed")) {
    return url.replace("watch?v=", "embed/");
  }
  return url;
}

async function getMintCheckoutLink(
  editionId: number,
  value: string // project's mint fee
): Promise<string> {
  try {
    const result = await fetch(`/api/get-mint-checkout-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        editionId, value,
      }),
    }).then((res) => res.json());

    if ("checkoutLinkIntentUrl" in result) {
      return result.checkoutLinkIntentUrl;
    }
  } catch (e) {
    console.error(e);
  }
  return "";
}

export default function IndividualProjectPage() {
  const router = useRouter()
  const { id } = router.query;

  const { data } = useGetProject(id?.toString())
  const { data: userData } = useGetUser(data?.founder)
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chains[0]?.id,
    enabled: Boolean(chains[0]?.id),
  });

  const editionId = onChainProjects?.findIndex(project => project.id === id)
  const value = editionId !== undefined && onChainProjects?.[editionId]?.fee
  const { data: checkoutLink, isLoading: isCheckoutLinkLoading } = useQuery(
    ["checkout-mint-link", editionId, value],
    () => getMintCheckoutLink(editionId!, value!.toString()),
    { enabled: editionId !== undefined && (value) !== undefined }
  );

  if (!data) {
    return <div>No project found</div>
  }
  console.log("Video URL", data.video_url)

  return (

    <div className="grid grid-cols-6 px-[5%] bg-white py-12">
      <div className="col-span-4 pr-10">
        <div>
          {transformYouTubeUrl(data?.video_url) !== '' ?
            <iframe
              width={"100%"}
              className="aspect-video pt-6"
              src={transformYouTubeUrl(data?.video_url)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            : <div>Invalid project video submitted. See browser console for more information</div>}
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
            <p>{data.tldr}</p>
            <hr />
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16 pt-10">
              Who is the team executing on this vision
            </h3>
            {data.team.map((teamMember, index) => (
              <div key={teamMember.name} className="space-y-2 pb-4">
                <h4 className="font-semibold">{index + 1}. {teamMember.name}</h4>
                <div className="text-gray-600">
                  {teamMember.bio}
                </div>
              </div>
            ))}
            <hr />
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16 pt-10">
              This project is looking for:
            </h3>
            <hr />
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
      <div className="col-span-2 px-4 pt-6">
        <div className="flex space-x-2 pb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={userData?.profile || "/default-avatar.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="pb-1">{userData?.name}</p>
            <p className="font-mono text-gray-600">
              {data.admin_address}
            </p>
          </div>
        </div>
        <hr />

        <div className="pt-8 pb-4">
          <div className="flex space-x-2 w-full">
            <Button className="w-full" variant={"ghost"} asChild disabled={isCheckoutLinkLoading || checkoutLink === undefined}>
              <Link href={checkoutLink!}>
                Collect <MoveDown className="ml-1 w-3 h-3" />
              </Link>
            </Button>
            <Button className="w-full" variant={"ghost"}>
              Sign Up <MoveDown className="ml-1 w-3 h-3" />
            </Button>
            <Button className="w-full" variant={"ghost"}>
              Contribute <MoveDown className="ml-1 w-3 h-3" />
            </Button>
          </div>
          <Button
            className="w-full mt-2 bg-gray-300 hover:bg-gray-200"
            variant={"ghost"}
          >
            Benefits <MoveDown className="ml-1 w-3 h-3" />
          </Button>
        </div>

        <hr />
        {data.benefits.map((benefit) => (
          <div key={benefit.text} className="mt-4 border rounded">
            <h3 className="p-4">
              Collect {benefit.amount} or more editions and get
            </h3>
            <hr />
            <p className="p-4">{benefit.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
