import { MilestoneFields } from '@/components/CreateProjectPage/MilestoneFields';
import { cn } from '@/lib/utils';

interface Props {
  isEdit?: boolean;
}

export function MilestoneSection({ isEdit }: Props) {
  return (
    <div className="mb-10 rounded border border-slate-200 p-10">
      <h1 className="font-base">Milestones</h1>
      <p className="form-subheading">{"What's your roadmap?"}</p>
      <hr className="border-b-1 my-8 border-slate-200" />
      <div
        className={cn('grid gap-10', isEdit ? 'grid-cols-1' : 'grid-cols-2')}
      >
        {!isEdit && (
          <div className="col-span-1 pr-4">
            <h2 className="font-base text-xl">Optional Milestones</h2>
            <p>
              We believe that building is an evolutionary process and we need
              achievable milestones to help reach it, share optional milestones
              here, big or small.
            </p>
            <br />
            <p>
              Please put a &quot;-&quot; for the funding amount if you want to
              add numbered milestones: e.g Milestone 1, Milestone 2
            </p>
          </div>
        )}
        <div className="col-span-1">
          <MilestoneFields />
        </div>
      </div>
    </div>
  );
}
