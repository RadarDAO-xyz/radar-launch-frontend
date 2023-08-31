import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useGetProject } from '@/hooks/useGetProject';
import { useGetProjectBelievers } from '@/hooks/useGetProjectBelievers';
import { believeProject } from '@/lib/backend';
import { useAccount, useQueryClient, useSignMessage } from 'wagmi';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { useState } from 'react';
import { ProjectStatus } from '@/types/mongo';
import { format } from 'date-fns';
import { shortenAddress } from '@/lib/utils';

interface Props {
  id: string;
}

export function BelieveTabContent({ id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: projectData } = useGetProject(id);
  const { isLoggedIn, login } = useAuth();
  const { data: projectBelieversData } = useGetProjectBelievers(id);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { address } = useAccount();
  const { signMessage, isLoading } = useSignMessage({
    message: `I ${
      address ? `(${address})` : ''
    } support ${projectData?.title} at ${new Date().toISOString()}

and a better future in: ${projectData?.tags.join(', ')}`,
    onSuccess: async (data, variables) => {
      try {
        await believeProject(id, data, variables.message, address!);
        await queryClient.invalidateQueries([CacheKey.PROJECT_BELIEVERS, id]);
        setIsOpen(false);
        toast({
          title: 'Successfully signed your message!',
        });
      } catch (e) {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'An unexpected error occured',
          description: 'Check the console for more information',
        });
      }
    },
  });

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <p>Believers</p>
        <p>{projectBelieversData?.length || 0}</p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="mb-4 w-full"
            // disabled={projectData?.status !== ProjectStatus.LIVE}
            disabled
            loading={isLoading}
          >
            Coming soon...
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Show your belief in this project</DialogTitle>
            <DialogDescription>
              You will be signing a message to show your belief in the project,
              which will be visible to all.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (!isLoggedIn) {
                  login();
                } else {
                  signMessage();
                }
              }}
            >
              {isLoggedIn ? 'SIGN MESSAGE' : 'LOGIN'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="text-center text-muted-foreground">
        Build reputation on Launch
      </p>
      <div className="grid gap-2 pt-6">
        {projectBelieversData?.slice(0, 20).map((believer) => (
          <div
            key={believer.signatureHash}
            className="flex justify-between border-y pb-2 pt-1 text-xs"
          >
            <p>{shortenAddress(believer.signingAddress)}</p>
            <div className="text-right text-muted-foreground">
              <p>{format(new Date(believer.createdAt), 'do MMMM yyyy')}</p>
              <p>{format(new Date(believer.createdAt), 'hh:mmaaa')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
