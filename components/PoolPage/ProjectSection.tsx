import { useGetPoolProjects } from '@/hooks/useGetPoolProjects';
import { Pool, ProjectStatus } from '@/types/mongo';
import { SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ProjectBlock } from '../Layout/ProjectBlock';
import Link from 'next/link';

export function ProjectSection({ _id, title }: Pool) {
  const { data } = useGetPoolProjects(_id);

  const liveProjects = data?.filter(
    (project) => project.status === ProjectStatus.LIVE,
  );

  return (
    <section className="px-[5%] py-12">
      <h2 className="border-none py-8 text-2xl">{title}</h2>
      <hr />
      <div className="flex flex-col-reverse justify-between gap-4 pt-8 md:flex-row">
        <div className="flex w-full gap-4">
          <Button variant="ghost">Recently backed</Button>
          <Button variant="ghost">Most popular</Button>
          <Button variant="ghost">Most recent</Button>
        </div>
        <div className="flex h-[40px] w-full max-w-[400px] items-center rounded-lg border border-gray-700">
          <SearchIcon className="my-2 ml-2 mr-3" />
          <Input className="rounded-l-none border-none bg-transparent !shadow-none !outline-0 !outline-offset-0 !ring-0 !ring-inset ring-gray-700 focus-visible:!ring-0 focus-visible:!ring-offset-0" />
        </div>
      </div>
      <div className="relative pt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {liveProjects && liveProjects.length > 0 ? (
            liveProjects.map((project) => (
              <ProjectBlock
                key={project._id}
                {...project}
                showMintEndDate
                showSupporters
              />
            ))
          ) : (
            <>
              <div className="max-w-80 h-80 w-full rounded-lg border border-slate-200" />
              <div className="max-w-80 hidden h-80 w-full rounded-lg border border-slate-200 lg:block" />
              <div className="max-w-80 hidden h-80 w-full rounded-lg border border-slate-200 lg:block" />
              <div className="max-w-80 hidden h-80 w-full rounded-lg border border-slate-200 lg:block" />
            </>
          )}
        </div>
        {liveProjects === undefined ||
          (liveProjects.length === 0 && (
            <div className="absolute left-0 right-0 top-[calc(50%-20px)] mx-auto w-full max-w-[800px] px-[5%] text-center ">
              <h2 className=" text-3xl">NOTHING TO SUPPORT YET</h2>
              <Button className="mt-3" asChild>
                <Link href="/project/create">SUBMIT YOUR PROJECT</Link>
              </Button>
            </div>
          ))}
      </div>
    </section>
  );
}
