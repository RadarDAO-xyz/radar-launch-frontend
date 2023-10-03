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
import { deleteProject } from '@/lib/backend';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from 'wagmi';
import { useToast } from '../ui/use-toast';
import { CacheKey } from '@/constants/react-query';

export function CancelSubmissionButton({ projectId }: { projectId: string }) {
  const { toast } = useToast();
  const { idToken } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    [CacheKey.DELETE_PROJECT, projectId, idToken],
    () => deleteProject(projectId, idToken),
    {
      onError: (e) => {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'An unexpected error occured',
          description: 'Check the console for more information',
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries([CacheKey.PROJECTS]);
        toast({
          title: 'Project successfully deleted',
        });
      },
    },
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Cancel Submission</Button>
      </DialogTrigger>
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
            variant={'destructive'}
            loading={isLoading}
          >
            REMOVE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
