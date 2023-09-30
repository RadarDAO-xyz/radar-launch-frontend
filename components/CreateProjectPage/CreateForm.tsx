import { ProjectSection } from '@/components/CreateProjectPage/ProjectSection';
import { SupportSection } from '@/components/CreateProjectPage/SupportSection';
import { TeamSection } from '@/components/CreateProjectPage/TeamSection';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useGetPools } from '@/hooks/useGetPools';
import { createProject } from '@/lib/backend';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { isAddress } from 'viem';
import { useMutation } from 'wagmi';
import * as z from 'zod';
import { CrowdFundSection } from './CrowdFundSection';
import { MilestoneSection } from './MilestoneSection';

export const createFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  video_url: z.string().min(1, { message: 'Video is required' }),
  video_id: z.string().min(1, { message: 'Video is required' }),
  tldr: z.string().min(1, { message: 'Brief description is required' }),
  thumbnail: z.optional(z.instanceof(File)),
  brief: z.string().min(1, { message: 'Brief is required' }),
  inspiration: z.string().min(1, { message: 'Inspiration is required' }),
  team: z.array(
    z.object({
      name: z.string().min(1, { message: 'Name is required' }),
      bio: z.string().min(1, { message: 'Bio is required' }),
      email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Please enter a valid email' }),
    }),
  ),
  tags: z.string(),
  collaborators: z.string(),
  waitlist: z.boolean().default(true),
  milestones: z.array(
    z.object({
      amount: z
        .string()
        .min(1, { message: "Please leave a '-' if you are not crowdfunding" }),
      text: z.string().min(1, { message: 'Milestone description is required' }),
    }),
  ),
  edition_price: z.coerce
    .number()
    .min(0, { message: 'Edition price too small, minimum 0' })
    .max(20, { message: 'Edition price too large, maximum 20' }),
  mint_end_date: z.date().refine((current) => current > new Date(), {
    message: 'Must end later than today',
  }),
  benefits: z.array(
    z.object({
      amount: z.coerce
        .number()
        .nonnegative({ message: 'Amount cannot be negative' }),
      text: z.string().min(1, { message: 'Benefit description is required' }),
    }),
  ),
  admin_address: z
    .string()
    .min(1, { message: 'Admin address is required' })
    .refine(
      (address) => {
        try {
          // isAddress throws an error
          return isAddress(address) || address.endsWith('.eth');
        } catch (e) {
          return false;
        }
      },
      {
        message: 'Invalid address',
      },
    ),
});

export function CreateForm() {
  const router = useRouter();
  const { user } = usePrivy();
  const { idToken } = useAuth();
  const { data: pools } = useGetPools();

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      video_url: '',
      tldr: '',
      brief: '',
      inspiration: '',
      team: [
        {
          name: '',
          bio: '',
          email: '',
        },
      ],
      collaborators: '',
      waitlist: true,
      milestones: [],
      edition_price: 0,
      mint_end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      benefits: [],
      tags: '',
      description: '',
      admin_address: user?.wallet?.address || '',
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  // const { data: ensAddressData } = useEnsAddress({
  //   name: admin_address,
  //   chainId: chains[0].id,
  //   enabled: admin_address.endsWith('.eth'),
  // });
  const { mutate, isLoading } = useMutation(
    [CacheKey.CREATE_PROJECT],
    () => {
      const values = form.getValues();
      // resolve ENS address
      // if (admin_address.endsWith('.eth')) {
      //   values.admin_address = ensAddressData || admin_address;
      // }
      // add default benefit
      if (values.benefits.length === 0) {
        values.benefits.push({
          amount: 1,
          text: '<ul><li><p>Become an onchain patron of my journey</p></li></ul>',
        });
      }
      // swap brief and pool fields
      const newValues = {
        ...values,
        pool: values.brief,
        brief: pools?.find((pool) => pool._id === values.brief)!.title!,
      };
      return createProject(idToken, newValues);
    },
    {
      onError: (e) => {
        console.log(e);
        toast({
          variant: 'destructive',
          title: 'An unexpected error occured',
          description: 'Check the console for more information',
        });
      },
      onSuccess: (data) => {
        toast({
          title: 'Successfully submitted project!',
          description:
            'Your project is now under review. Redirecting you to your profile page...',
        });
        setTimeout(() => {
          router.push('/profile/' + data.founder);
        }, 2000);
      },
    },
  );
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    // print form errors
    if (Object.keys(errors).length !== 0) {
      console.error({ errors, values });
    }

    mutate();
  }

  return (
    <Form {...form}>
      <form
        id="create-project"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
      >
        <ProjectSection />
        <TeamSection />
        <SupportSection />
        <MilestoneSection />
        <CrowdFundSection />
        <div className="mb-10 rounded border border-slate-200 p-10">
          <h1 className="font-base">Ready to submit</h1>
          <p className="form-subheading">What happens next?</p>
          <hr className="border-b-1 my-8 border-slate-200" />
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1 pr-4">
              <h2 className="font-base text-xl">Project Review</h2>
              <p>
                Selected RADAR Community members review proposals and respond
                within 48 hours. We are unable to provide feedback on
                unsuccessful briefs but you may re-apply.
              </p>
            </div>
            <div className="col-span-1">
              <h3>Your proposal will be accepted if:</h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>You have answered a brief</li>
                <li>
                  {
                    'You have shown you have the skills to execute on your project'
                  }
                </li>
                <li>
                  {'You are building something that people want to be part of'}
                </li>
              </ul>
              <h3 className="mt-4">Your proposal will be denied if:</h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>{"You're not answering the brief"}</li>
                <li>{'Your submissions contains a prohibited item'}</li>
                <li>
                  {'Your selling a purely speculative asset with no utility'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-20">
          <Button asChild variant="ghost">
            <Link href="https://t.me/+e97ms5e1fvJiMjhk" target="_blank">
              Join our Telegram group to get the alpha
            </Link>
          </Button>
          <Button
            type="submit"
            form="create-project"
            disabled={idToken === '' || isLoading}
            loading={isLoading}
          >
            {idToken === '' ? 'Please Login' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
