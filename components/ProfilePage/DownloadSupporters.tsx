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
import { downloadProjectSupporters } from "@/lib/backend";
import { ProjectWithChainData } from "@/pages/profile/[id]";
import { ProjectStatus } from "@/types/mongo";
import { useEffect } from "react";
import { useMutation } from "wagmi";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { DownloadIcon } from "lucide-react";

export function DownloadSupporters({
  status,
  _id,
  title,
}: ProjectWithChainData) {
  const { toast } = useToast();
  const { idToken, isLoggedIn } = useAuth();
  const { mutateAsync, error, data } = useMutation(
    ["download-project", _id, idToken],
    () => downloadProjectSupporters(_id, idToken),
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

  function downloadCsv() {
    console.log(data);
    if (data !== undefined) {
      const encodedURI = encodeURI("data:text/csv;charset=utf-8," + data);

      const link = document.createElement("a");
      link.setAttribute("href", encodedURI);
      link.setAttribute("download", `${title} Supporters.csv`);
      document.body.appendChild(link);

      link.click();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={
            status === ProjectStatus.IN_REVIEW ||
            status === ProjectStatus.APPROVED
          }
        >
          Download Supporters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download Supporters</DialogTitle>
          <DialogDescription>
            You will receive your supporter information in CSV format.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={async () => {
              await mutateAsync?.();
              downloadCsv();
            }}
            disabled={!isLoggedIn}
          >
            {!isLoggedIn ? (
              "Please Sign In"
            ) : (
              <>
                <DownloadIcon className="w-4 h-4 mr-2" />
                DOWNLOAD
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
