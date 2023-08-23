import { generateVideoThumbnail } from '@/lib/generateVideoThumbnail';
import { ProjectWithOwnedAmount } from '@/pages/profile/[id]';
import Link from 'next/link';
import { HTMLParsedComponent } from '../Layout/HTMLParsedComponent';
import { Button } from '../ui/button';

export function CollectedVision({
  brief,
  title,
  tldr,
  video_url,
  _id,
}: ProjectWithOwnedAmount) {
  return (
    <div className="col-span-1 p-2">
      <HTMLParsedComponent text={brief} className="pb-2 text-xs" />
      <img
        src={generateVideoThumbnail(video_url)}
        alt={title + ' thumbnail'}
      />{' '}
      <h3 className="py-3 font-semibold leading-5 transition-opacity hover:opacity-60">
        <Link href={`/project/${_id}`}>{title}</Link>
      </h3>
      <div className="flex">
        <HTMLParsedComponent
          className="h-8 overflow-hidden text-ellipsis  whitespace-nowrap text-xs"
          text={tldr}
        />
        {tldr.length > 60 && (
          <span className="relative -top-1 text-sm">...</span>
        )}
      </div>
      <Button className="w-full" asChild>
        <Link href={`/project/${_id}`}>View Updates</Link>
      </Button>
    </div>
  );
}
