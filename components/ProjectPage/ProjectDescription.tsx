import { HTMLParsedComponent } from '../Layout/HTMLParsedComponent';
import { Table, TableBody, TableRow, TableCell } from '../ui/table';
import { Project } from '@/types/mongo';
import parse from 'html-react-parser';

export function ProjectDescription({
  team,
  tldr,
  collaborators,
  milestones,
  benefits,
}: Project) {
  return (
    <>
      <div className="pb-16">
        <h3 className="pb-8 text-lg font-medium decoration-slate-100">
          Project TLDR
        </h3>
        <HTMLParsedComponent text={tldr} />
      </div>
      <hr />
      <h3 className="pb-8 pt-10 text-lg font-medium decoration-slate-100">
        Who is the team executing on this project
      </h3>
      {team.map((teamMember) => (
        <div key={teamMember.name} className="space-y-2 pb-4 last:pb-8">
          <h4 className="font-semibold">{teamMember.name}</h4>
          <HTMLParsedComponent
            className="text-gray-600"
            text={teamMember.bio}
          />
        </div>
      ))}
      {collaborators && (
        <>
          <hr />
          <div className="pb-16 pt-10">
            <h3 className="pb-8 text-lg font-medium decoration-slate-100">
              This project is looking for:
            </h3>
            <HTMLParsedComponent text={collaborators} />
          </div>
        </>
      )}
      {benefits.length > 0 ? (
        <>
          <h3 className="pb-8 text-lg font-medium decoration-slate-100">
            Benefits for Patrons
          </h3>
          <div className='grid grid-cols-1 gap-4'>
            {benefits.filter(Boolean).map((benefit) => (
              <div key={benefit.text} className="rounded-md border">
                <h3 className="px-6 py-4 text-gray-500">
                  Collect <span className="text-black">{benefit.amount}</span>{' '}
                  or more editions and get
                </h3>
                <hr />
                <HTMLParsedComponent
                  text={benefit.text}
                  className="px-6 pt-4"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-md border p-6">No benefits found</div>
      )}
      {milestones.length > 0 && (
        <>
          <hr />
          <h3 className="pb-8 pt-10 text-lg font-medium decoration-slate-100">
            Funding Goals
          </h3>
          <Table className="mb-6">
            <TableBody>
              {milestones.map((milestone, index) => (
                <TableRow key={milestone.text}>
                  <TableCell className={'align-top text-xl font-medium'}>
                    {renderMilestoneAmount(milestone.amount, index)}
                  </TableCell>
                  <TableCell className="border-l">
                    <HTMLParsedComponent text={milestone.text} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}

function renderMilestoneAmount(
  milestoneAmount: string | number,
  index: number,
) {
  if (
    typeof milestoneAmount === 'number' ||
    !isNaN(+milestoneAmount.replaceAll(',', ''))
  ) {
    return (
      <span className="text-normal">
        ${' '}
        <span className="text-lg text-gray-400">
          {(typeof milestoneAmount === 'number'
            ? milestoneAmount
            : +milestoneAmount.replaceAll(',', '')
          ).toFixed(2)}
        </span>
      </span>
    );
  }

  if (milestoneAmount !== '' && milestoneAmount !== '-') {
    return <span>{milestoneAmount}</span>;
  }

  return `${index + 1}.`;
}
