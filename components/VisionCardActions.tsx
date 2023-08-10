import { ProjectWithChainData } from "@/pages/profile/[id]";
import { ProjectStatus } from "@/types/mongo";
import { WithdrawETHButton } from "./ProfilePage/WithdrawETHButton";
import { Button } from "./ui/button";

export function VisionCardActions(props: ProjectWithChainData) {
  const { status } = props;
  return (
    <div className="flex flex-col space-y-1">
      {status === ProjectStatus.IN_REVIEW && <Button>Cancel Submission</Button>}
      {status === ProjectStatus.APPROVED && <Button>Launch Project</Button>}
      {status !== ProjectStatus.CANCELLED &&
        status !== ProjectStatus.REJECTED && <WithdrawETHButton {...props} />}
      {status !== ProjectStatus.CANCELLED &&
        status !== ProjectStatus.REJECTED && (
          <Button
            disabled={
              status === ProjectStatus.IN_REVIEW ||
              status === ProjectStatus.APPROVED
            }
          >
            Supporters List
          </Button>
        )}
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
