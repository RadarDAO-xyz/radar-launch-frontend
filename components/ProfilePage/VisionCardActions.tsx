import { ProjectWithChainData } from "@/pages/profile/[id]";
import { ProjectStatus } from "@/types/mongo";
import { Button } from "../ui/button";
import { CancelSubmissionButton } from "./CancelSubmissionButton";
import { DownloadSupporters } from "./DownloadSupporters";
import { WithdrawETHButton } from "./WithdrawETHButton";

export function VisionCardActions(props: ProjectWithChainData) {
  const { status, _id } = props;

  return (
    <div className="flex flex-col space-y-1">
      {status === ProjectStatus.IN_REVIEW && (
        <CancelSubmissionButton projectId={_id} />
      )}
      {status === ProjectStatus.APPROVED && <Button>Launch Project</Button>}
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
