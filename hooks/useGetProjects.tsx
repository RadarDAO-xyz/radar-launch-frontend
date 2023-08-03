import { Project } from "@/types/mongo";
import { useQuery } from "wagmi";

async function getProjects(): Promise<Project[]> {
  try {
    return fetch(`${process.env.BACKEND_URL}/projects?all`, {
      mode: "no-cors",
    }).then((res) => res.json());
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function useGetProjects() {
  return useQuery(["projects"], getProjects);
}
