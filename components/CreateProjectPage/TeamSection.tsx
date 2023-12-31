import { cn } from '@/lib/utils';
import { TeamFields } from './TeamFields';

interface Props {
  isEdit?: boolean;
}

export function TeamSection({ isEdit }: Props) {
  return (
    <div className="mb-10 rounded border border-slate-200 p-10">
      <h1 className="font-base">The Team</h1>
      <p className="form-subheading">{"Who's building this project?"}</p>
      <hr className="border-b-1 my-8 border-slate-200" />
      <div
        className={cn('grid gap-10', isEdit ? 'grid-cols-1' : 'grid-cols-2')}
      >
        {!isEdit && (
          <div className="col-span-1 pr-4">
            <h2 className="font-base text-xl">Team</h2>
            <p>
              Please add <strong>yourself</strong> and your team members names
              and brief bio. Note that your email will not be visible on the
              platform.
            </p>
          </div>
        )}
        <div className="col-span-1">
          <TeamFields />
        </div>
      </div>
    </div>
  );
}
