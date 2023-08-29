import { SponsorFields } from '@/components/CreatePoolPage/SponsorFields';
import { Placeholder } from '@/components/Layout/Placeholder';
import { TinyMCE } from '@/components/Layout/TinyMCE';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { CacheKey } from '@/constants/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { createPool } from '@/lib/backend';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'wagmi';
import * as z from 'zod';

export const createPoolFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  subtitle: z.string().min(1, { message: 'Subtitle is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  pool_amount: z.coerce
    .number()
    .min(0, { message: 'Pool amount must at least be 0' }),
  hero_image: z.string(),
  sponsors: z.array(
    z.object({
      logo: z.string(),
      link: z.string(),
      name: z.string().min(1, { message: 'Name required' }),
      contribution: z.coerce
        .number()
        .min(1, { message: 'Contribution amount required' }),
    }),
  ),
  video: z.string().url().min(1, { message: 'Video url required' }),
});

export default function CreatePoolPage() {
  const { data } = useGetCurrentUser();
  const { idToken } = useAuth();
  const form = useForm<z.infer<typeof createPoolFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(createPoolFormSchema),
    defaultValues: {
      sponsors: [
        {
          contribution: 0,
          link: '',
          logo: '',
          name: '',
        },
      ],
    },
  });
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { mutate, isLoading } = useMutation(
    [CacheKey.CREATE_POOL],
    () => {
      const values = form.getValues();
      const newValues = {
        ...values,
        sponsors: values.sponsors.map((sponsor) => ({
          ...sponsor,
          contribution: sponsor.contribution.toString(),
        })),
      };
      // @ts-expect-error the sponsor contribution type is incorrect in the backend schema
      return createPool(idToken, newValues);
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
          title: 'Successfully created pool!',
        });
      },
    },
  );

  if (!data?.wallets?.[0].address || !idToken) {
    return (
      <Placeholder>
        <h1>Please Login</h1>
      </Placeholder>
    );
  }

  if (!data.bypasser) {
    return (
      <Placeholder>
        <h1>Not authorized to view this page</h1>
      </Placeholder>
    );
  }

  function onSubmit(values: z.infer<typeof createPoolFormSchema>) {
    // print form errors
    if (Object.keys(errors).length !== 0) {
      console.error({ errors, values });
    }

    mutate();
  }

  return (
    <section className="mx-auto mt-24 max-w-screen-lg">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="subtitle"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem className="pb-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <TinyMCE
                      {...rest}
                      onEditorChange={(value, editor) => {
                        onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name="pool_amount"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel>Pool Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="hero_image"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel>Hero Image</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="video"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SponsorFields />
          <Button
            type="submit"
            disabled={idToken === '' || isLoading}
            loading={isLoading}
          >
            Create Pool
          </Button>
        </form>
      </Form>
    </section>
  );
}
