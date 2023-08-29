import { Placeholder } from '@/components/Layout/Placeholder';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <Placeholder>
      <div className='flex flex-col gap-4'>
        <h1 className="text-3xl">Page Not Found</h1>
        <Button onClick={() => router.back()}>Click here to go back</Button>
      </div>
    </Placeholder>
  );
}
