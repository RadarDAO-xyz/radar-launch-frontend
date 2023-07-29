import { Project } from "@/types/mongo";
import { Button } from "./ui/button";

export function VisionCardActions({}: Project) {
  return (
    <div className="flex flex-col space-y-1">
      <Button>Cancel Submission</Button>
      <Button>Withdraw ETH</Button>
      <Button>Supporters List</Button>
      <Button>Update</Button>
    </div>
  );
}
