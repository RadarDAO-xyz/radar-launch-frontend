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
import { useMutation } from 'wagmi';
import { createPool } from '@/lib/backend';
import { CacheKey } from '@/constants/react-query';
import { SponsorFields } from '@/components/CreatePoolPage/SponsorFields';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Pool } from '@/types/mongo';
import { RecursivePartial } from '@/types/utils';
import { useEffect } from 'react';

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
  brief_button_link: z.string().url({ message: 'Not URL' }),
  brief_button_text: z.string().min(1, { message: 'Required' }),
  event_button_link: z.string().url({ message: 'Not URL' }),
  event_button_text: z.string().min(1, { message: 'Required' }),
});

interface Props extends RecursivePartial<Pool> {
  isEdit?: boolean;
}

export function CreatePoolForm(props: Props) {
  const { isEdit, ...pool } = props;
  const { idToken } = useAuth();
  const form = useForm<z.infer<typeof createPoolFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(createPoolFormSchema),
    defaultValues: isEdit
      ? pool
      : {
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
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = form;
  const { toast } = useToast();

  const { mutate, isLoading } = useMutation(
    [CacheKey.CREATE_POOL, isEdit],
    () => {
      const values = form.getValues();
      const newValues = {
        ...values,
        is_hidden: false,
      };
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

  useEffect(() => {
    if (isEdit && pool !== undefined) {
      for (const key in pool) {
        setValue(key as any, pool[key as keyof Pool] as any);
      }
    }
  }, [pool, isEdit]);

  function onSubmit(values: z.infer<typeof createPoolFormSchema>) {
    // print form errors
    if (Object.keys(errors).length !== 0) {
      console.error({ errors, values });
    }

    mutate();
  }

  return (
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
        <FormField
          control={control}
          name="brief_button_text"
          render={({ field }) => (
            <FormItem className="pb-4 pt-4">
              <FormLabel>Brief Button Text</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="brief_button_link"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel>Brief Button Link</FormLabel>
              <FormControl>
                <Input type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="event_button_text"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel>Event Button Text</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="event_button_link"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel>Event Button Link</FormLabel>
              <FormControl>
                <Input type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={idToken === '' || isLoading}
          loading={isLoading}
        >
          {isEdit ? 'Update Pool' : 'Create Pool'}
        </Button>
      </form>
    </Form>
  );
}
