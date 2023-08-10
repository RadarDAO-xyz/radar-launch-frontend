import { useGetPoolProjects } from "@/hooks/useGetPoolProjects";

interface Props {
  poolId: string;
}

export function ProjectSection({ poolId }: Props) {
  const { data } = useGetPoolProjects(poolId);
  console.log(data);
  return <div></div>;
}
