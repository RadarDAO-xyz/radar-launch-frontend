import { useGetPoolProjects } from "@/hooks/useGetPoolProjects";
import { Pool } from "@/types/mongo";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ProjectSection({ _id, title }: Pool) {
  const { data } = useGetPoolProjects(_id);
  return (
    <section className="px-[5%] py-12">
      <h2 className="text-2xl border-none py-8">{title}</h2>
      <hr />
      <div className="pt-8 flex flex-col-reverse gap-4 md:flex-row justify-between">
        <div className="flex gap-4 w-full">
          <Button variant="ghost">Recently backed</Button>
          <Button variant="ghost">Most popular</Button>
          <Button variant="ghost">Most recent</Button>
        </div>
        <div className="max-w-[400px] border w-full items-center border-gray-700 rounded-lg flex h-[40px]">
          <SearchIcon className="ml-2 mr-3 my-2" />
          <Input className="bg-transparent rounded-l-none border-none ring-gray-700 !shadow-none !outline-offset-0 !outline-0 !ring-inset !ring-0 focus-visible:!ring-0 focus-visible:!ring-offset-0" />
        </div>
      </div>
      <div className="pt-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="max-w-80 w-full h-80 border border-slate-200 rounded-lg" />
          <div className="max-w-80 hidden lg:block border w-full h-80 border-slate-200 rounded-lg" />
          <div className="max-w-80 hidden lg:block border w-full h-80 border-slate-200 rounded-lg" />
          <div className="max-w-80 hidden lg:block border w-full h-80 border-slate-200 rounded-lg" />
        </div>
        <div className="absolute left-0 right-0 px-[5%] mx-auto max-w-[800px] w-full top-[calc(50%-20px)] text-center ">
          <h2 className=" text-3xl">NOTHING TO SUPPORT YET</h2>
          <Button className="mt-3">SUBMIT YOUR PROJECT</Button>
        </div>
      </div>
    </section>
  );
}
