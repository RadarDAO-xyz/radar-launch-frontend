import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { downloadProjectSupporters } from '@/lib/backend';
import { ProjectWithChainData } from '@/pages/profile/[id]';
import { Project, ProjectStatus } from '@/types/mongo';
import { DownloadIcon } from 'lucide-react';
import { useMutation } from 'wagmi';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { CacheKey } from '@/constants/react-query';

function downloadTextAsCsv(text: string, fileName: string) {
  if (text !== undefined) {
    const encodedURI = encodeURI('data:text/csv;charset=utf-8,' + text);

    const link = document.createElement('a');
    link.setAttribute('href', encodedURI);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);

    link.click();
  }
}

export function DownloadSupporters({ status, _id, title }: Project) {
  const { toast } = useToast();
  const { idToken, isLoggedIn } = useAuth();
  const { mutate } = useMutation(
    [CacheKey.DOWNLOAD_PROJECT_SUPPORTERS, _id, idToken],
    () => downloadProjectSupporters(_id, idToken),
    {
      onSuccess: (text) => {
        downloadTextAsCsv(text, `${title} Supporters.csv`);
      },
      onError: (e) => {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'An unexpected error occured',
          description: 'Check the console for more information',
        });
      },
    },
  );

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
              mutate();
            }}
            disabled={!isLoggedIn}
          >
            {!isLoggedIn ? (
              'Please Sign In'
            ) : (
              <>
                <DownloadIcon className="mr-2 h-4 w-4" />
                DOWNLOAD
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
