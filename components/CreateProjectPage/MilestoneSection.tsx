import { MilestoneFields } from '@/components/CreateProjectPage/MilestoneFields';

export function MilestoneSection() {
  return (
    <div className="mb-10 rounded border border-slate-200 p-10">
      <h1 className="font-base">Milestones</h1>
      <p className="form-subheading">{"What's your roadmap?"}</p>
      <hr className="border-b-1 my-8 border-slate-200" />
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 pr-4">
          <h2 className="font-base text-xl">Funding Milestones</h2>
          <p>
            We believe that building is an evolutionary process and we need
            achievable milestones to help reach it, please list your milestones,
            big or small, if you are crowdfunding, you must reach the amount in
            milestone 1 to withdraw funds. Otherwise, supporters will receive a
            refund.
          </p>
          <br />
          <p>
            If you are not crowdfunding, leave the funding amounts blank or a
            &quot;-&quot;
          </p>
        </div>
        <div className="col-span-1">
          <MilestoneFields />
        </div>
      </div>
    </div>
  );
}
