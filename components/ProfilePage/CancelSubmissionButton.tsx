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
import { useEffect } from "react";
import { Button } from "react-day-picker";
import { useMutation } from "wagmi";
import { useToast } from "../ui/use-toast";

export function CancelSubmissionButton({ projectId }: { projectId: string }) {
  const { toast } = useToast();
  const { idToken } = useAuth();
  const { mutateAsync, error } = useMutation(
    ["delete-project", projectId, idToken],
    () => deleteProject(projectId, idToken)
  );

  useEffect(() => {
    if (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Please check your browser console for more information",
      });
    }
  }, [error]);

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
              mutateAsync?.();
            }}
          >
            WITHDRAW
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
