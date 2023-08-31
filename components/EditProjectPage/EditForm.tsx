import { ProjectSection } from '@/components/CreateProjectPage/ProjectSection';
import { SupportSection } from '@/components/CreateProjectPage/SupportSection';
import { TeamSection } from '@/components/CreateProjectPage/TeamSection';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useGetPools } from '@/hooks/useGetPools';
import { Project } from '@/types/mongo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'wagmi';
import * as z from 'zod';
import { createFormSchema } from '../CreateProjectPage/CreateForm';
import { CrowdFundSection } from '../CreateProjectPage/CrowdFundSection';
import { MilestoneSection } from '../CreateProjectPage/MilestoneSection';
import { updateProject } from '@/lib/backend';

export function EditForm(props: Project) {
  const { idToken } = useAuth();
  const { data: pools } = useGetPools();

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    mode: 'onBlur',
    defaultValues: {
      ...props,
      thumbnail: undefined,
      tags: props.tags.join(', '),
      mint_end_date: new Date(props.mint_end_date),
      brief: props.pool,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading } = useMutation(
    [CacheKey.UPDATE_PROJECT, props._id],
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
      const newValues = {
        ...values,
        pool: values.brief,
        brief: pools?.find((pool) => pool._id === values.brief)?.title,
      };
      return updateProject(newValues, props._id, idToken);
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
      onSuccess: () => {
        toast({
          title: 'Successfully updated project!',
        });
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
        id="update-project"
        name="update-project"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
      >
        <ProjectSection isEdit thumbnail={props.thumbnail} />
        <TeamSection isEdit />
        <SupportSection isEdit />
        <MilestoneSection isEdit />
        <CrowdFundSection isEdit />
        <div className="mb-10 rounded border border-slate-200 p-10">
          <h1 className="font-base">Update your project</h1>
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
          <Button
            type="submit"
            id="update-project"
            disabled={idToken === '' || isLoading}
            loading={isLoading}
          >
            {idToken === '' ? 'Please Login' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
