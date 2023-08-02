import { Project } from "@/types/mongo";
import { useQuery } from "wagmi";

async function getProject(id: string): Promise<Project | undefined> {
  try {
    return fetch(`${process.env.BACKEND_URL}/projects/${id}`).then((res) =>
      res.json()
    );
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function useGetProject(id?: string) {
  return useQuery(["project", id], () => getProject(id!), {
    enabled: Boolean(id)
  });
}
