import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export default function IndividualProjectAdminPage() {
  const { address, status } = useAccount();
  const router = useRouter();

  if (status === "disconnected") {
    return (
      <div className="mt-36 container mb-20 text-center">
        <h1>Please login to see the page</h1>
        <p>
          You can login either with your wallet or other social authentication
          providers.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-[80px] pt-6 pb-12 container max-w-7xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/default-avatar.png" />
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl">Founder Name</h2>
            <p className="font-mono text-gray-600">{address}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link href="/">
            Share Update <MoveUpRight className="inline h-3 w-3" />
          </Link>
          <Link href="/">
            Edit Profile <MoveUpRight className="inline h-3 w-3" />
          </Link>
        </div>
      </div>
      <hr className="mt-6" />
      <div className="py-4 flex justify-between items-center">
        <p>Bio</p>
        <Button variant={"ghost"}>Find out more</Button>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="your-visions">
          <TabsList className="grid w-full grid-cols-6 gap-4 mx-auto mb-6">
            <TabsTrigger
              // className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal"
              value="your-visions"
            >
              Your Visions
            </TabsTrigger>
            <TabsTrigger
              // className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal"
              value="collected-visions"
            >
              Collected Visions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="your-visions" className="border rounded-lg p-8">
            <h2 className="text-2xl">Active Visions</h2>
            <div></div>
          </TabsContent>
          <TabsContent value="collected-visions"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
