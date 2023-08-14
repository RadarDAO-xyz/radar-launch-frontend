import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { deleteProject } from "@/lib/backend";
import { Button } from "react-day-picker";
import { useMutation } from "wagmi";
import { useToast } from "../ui/use-toast";

export function CancelSubmissionButton({ projectId }: { projectId: string }) {
  const { toast } = useToast();
  const { idToken } = useAuth();
  const { mutate, error } = useMutation(
    ["delete-project", projectId, idToken],
    () => deleteProject(projectId, idToken),
    {
      onError: (e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Please check your browser console for more information",
        });
      },
    }
  );

  return (
    <Dialog>
      <DialogTrigger asChild>Cancel Submission</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm cancel submission?</DialogTitle>
          <DialogDescription>You cannot undo this action.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              mutate();
            }}
          >
            WITHDRAW
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
