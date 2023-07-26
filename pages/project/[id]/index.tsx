import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

enum Tab {
  ONE = "ONE",
  TWO = "TWO",
}

const milestones = [
  {
    name: "Milestone 1",
    amount: 0,
  },
  {
    name: "Milestone 2",
    amount: 0,
  },
  {
    name: "Milestone 3",
    amount: 0,
  },
  {
    name: "Milestone 4",
    amount: 0,
  },
  {
    name: "Milestone 5",
    amount: 0,
  },
  {
    name: "Milestone 6",
    amount: 0,
  },
];

export default function IndividualProjectPage() {
  return (
    <div className="grid grid-cols-6 mt-20 px-[5%] bg-white py-12">
      <div className="col-span-4 overflow-y-scroll pr-10">
        <div>
          <iframe
            width={"100%"}
            className="aspect-video  pt-6"
            src={`https://www.youtube.com/embed/wy8tgRbHN1U`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        <div className="text-lg pt-10 pb-4">
          The Brief: <span className="font-semibold">Brief Name</span>
        </div>
        <h2 className="text-3xl pb-4">Heading</h2>
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
            <hr />
            <h3 className="font-medium text-lg underline underline-offset-[16px] decoration-slate-100 pb-16 pt-10">
              Who is the team executing on this vision
            </h3>
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
                {milestones.map((milestone) => (
                  <TableRow key={milestone.name}>
                    <TableCell className="font-medium text-xl w-[200px]">
                      ${" "}
                      <span className="text-gray-400 text">
                        {milestone.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="border-l" >
                      {milestone.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value={Tab.TWO}></TabsContent>
        </Tabs>
      </div>
      <div className="col-span-2 overflow-y-scroll">buttons</div>
    </div>
  );
}
