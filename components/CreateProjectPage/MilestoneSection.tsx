import { MilestoneFields } from '@/components/CreateProjectPage/MilestoneFields';

export function MilestoneSection() {
  return (
    <div className="mb-10 rounded border border-slate-200 p-10">
      <h1 className="font-base">Milestones</h1>
      <p className="form-subheading">{"What's your roadmap?"}</p>
      <hr className="border-b-1 my-8 border-slate-200" />
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 pr-4">
          <h2 className="font-base text-xl">Optional Milestones</h2>
          <p>
            We believe that building is an evolutionary process and we need
            achievable milestones to help reach it, share optional milestones
            here, big or small.
          </p>
          <br />
          <p>
            Please put a &quot;-&quot; for the funding amount if you want to add
            numbered milestones: e.g Milestone 1, Milestone 2
          </p>
        </div>
        <div className="col-span-1">
          <MilestoneFields />
        </div>
      </div>
    </div>
  );
}
