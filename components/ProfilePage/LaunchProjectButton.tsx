import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CacheKey } from "@/constants/react-query";
import { useAuth } from "@/hooks/useAuth";
import { updateProject } from "@/lib/backend";
import { Project, ProjectStatus } from "@/types/mongo";
import { RocketIcon } from "lucide-react";
import { useMutation, useQueryClient } from "wagmi";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

export function LaunchProjectButton({ status, _id }: Project) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { idToken, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    [CacheKey.UDPATE_PROJECT_STATUS, _id, idToken],
    () => updateProject({ status: ProjectStatus.LIVE }, _id, idToken),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([CacheKey.PROJECTS]);
        toast({
          title: "Successfully launched project!",
        });
        setIsOpen(false);
      },
      onError: (e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "An unexpected error occured",
          description: "Check the console for more information",
        });
      },
    }
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={status !== ProjectStatus.APPROVED}>
          Launch Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Launch Project</DialogTitle>
          <DialogDescription>
            Your project will be launched and displayed on the respective grant
            pool page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={async () => {
              mutate();
            }}
            disabled={!isLoggedIn}
          >
            {!isLoggedIn ? (
              "Please Sign In"
            ) : (
              <>
                <RocketIcon className="w-4 h-4 mr-2" />
                LAUNCH
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
