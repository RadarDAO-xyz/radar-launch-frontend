import { Button } from '@/components/ui/button';
import { ProjectWithChainData } from '@/types/web3';
import Link from 'next/link';
import { DownloadSupporters } from '../ProfilePage/DownloadSupporters';
import { ProjectSettingsDialog } from './ProjectSettingsDialog';
import { ProjectVideoDialog } from './ProjectVideoDialog';

export function ProjectActions(props: ProjectWithChainData) {
  return (
    <div className="mt-4 flex gap-4">
      <Button asChild>
        <Link href={`/project/${props._id}/edit`}>Edit</Link>
      </Button>
      <ProjectSettingsDialog {...props} />
      <ProjectVideoDialog {...props} />
      <DownloadSupporters {...props} />
    </div>
  );
}
