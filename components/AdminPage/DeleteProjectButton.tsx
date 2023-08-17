import { deleteProject } from "@/lib/backend";
import { useMutation, useQueryClient } from "wagmi";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const { idToken } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ["delete-project", projectId, idToken],
    () => deleteProject(projectId, idToken),
    {
      onError: (e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "An unexpected error occured",
          description: "Check the console for more information",
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(["projects"]);
        toast({
          title: "Successfully deleted projects",
        });
      },
    }
  );

  return (
    <Button variant="destructive" onClick={() => mutate()} disabled={isLoading}>
      Delete Project (database)
    </Button>
  );
}
