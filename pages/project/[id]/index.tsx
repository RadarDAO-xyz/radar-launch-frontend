import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveDown } from "lucide-react";

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

const benefits = [
  {
    amountRequired: 0,
    benefitTitle: "Benefit 1",
  },
  {
    amountRequired: 0,
    benefitTitle: "Benefit 2",
  },
  {
    amountRequired: 0,
    benefitTitle: "Benefit 3",
  },
  {
    amountRequired: 0,
    benefitTitle: "Benefit 4",
  },
  {
    amountRequired: 0,
    benefitTitle: "Benefit 5",
  },
  {
    amountRequired: 0,
    benefitTitle: "Benefit 6",
  },
  {
    amountRequired: 0,
    benefitTitle: "Benefit 7",
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
                    <TableCell className="border-l">{milestone.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value={Tab.TWO}></TabsContent>
        </Tabs>
      </div>
      <div className="col-span-2 overflow-y-scroll px-4 pt-6">
        <div className="flex space-x-2 pb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/default-avatar.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="pb-1">Founder Name</p>
            <p className="font-mono text-gray-600">
              0x7730B4Cdc1B1E7a33A309AB7205411faD009C106
            </p>
          </div>
        </div>
        <hr />

        <div className="pt-8 pb-4">
          <div className="flex space-x-2 w-full">
            <Button className="w-full" variant={"ghost"}>
              Collect <MoveDown className="ml-1 w-3 h-3" />
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
        {benefits.map((benefit) => (
          <div key={benefit.benefitTitle} className="mt-4 border rounded">
            <h3 className="p-4">
              Collect {benefit.amountRequired} or more editions and get
            </h3>
            <hr />
            <p className="p-4">{benefit.benefitTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
