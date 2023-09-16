import { ProjectWithChainData } from '@/types/web3';
import { ProjectStatus } from '@/types/mongo';
import { Button } from '../ui/button';
import { CancelSubmissionButton } from './CancelSubmissionButton';
import { DownloadSupporters } from './DownloadSupporters';
import { WithdrawETHButton } from './WithdrawETHButton';
import { LaunchProjectButton } from './LaunchProjectButton';
import Link from 'next/link';

export function VisionCardActions(props: ProjectWithChainData) {
  const { status, _id } = props;

  return (
    <div className="flex flex-col space-y-1">
      {status === ProjectStatus.IN_REVIEW && (
        <CancelSubmissionButton projectId={_id} />
      )}
      {status === ProjectStatus.IN_REVIEW && (
        <Button asChild>
          <Link href={`/project/${_id}/edit`}>Edit Submission</Link>
        </Button>
      )}
      {status === ProjectStatus.APPROVED && <LaunchProjectButton {...props} />}
      {status !== ProjectStatus.CANCELLED &&
        status !== ProjectStatus.REJECTED && <WithdrawETHButton {...props} />}
      {status !== ProjectStatus.CANCELLED &&
        status !== ProjectStatus.REJECTED && <DownloadSupporters {...props} />}
      {status === ProjectStatus.LIVE ||
        (status === ProjectStatus.BUILDING && <Button>Update</Button>)}
      {status === ProjectStatus.REJECTED && (
        <Button>Submit another vision</Button>
      )}
      {status === ProjectStatus.REJECTED && (
        <Button>Download submission</Button>
      )}
    </div>
  );
}
