import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="mt-48 mb-20 container text-center">
      <h1 className="text-3xl">Page Not Found</h1>
      <Button onClick={() => router.back()}>Click here to go back</Button>
    </div>
  );
}
