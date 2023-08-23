import { AuthContext } from '@/components/Providers/AuthProvider';
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
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import { useMutation, useQueryClient } from 'wagmi';

async function updateUser(
  values: z.infer<typeof schema>,
  userId: string,
  idToken: string,
) {
  const formData = new FormData();
  if (values.profile) {
    formData.append('profile', values.profile);
    formData.append(
      'payload_json',
      JSON.stringify({ ...values, profile: values.profile.name }),
    );
  } else {
    formData.append('payload_json', JSON.stringify(values));
  }

  const res = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body: formData,
  });
  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to update user');
  }
  return await res.json();
}

const schema = z.object({
  name: z.string().min(1, { message: 'Please enter a valid name' }),
  socials: z.string().url({ message: 'Please enter a valid URL' }),
  bio: z.string(),
  profile: z.instanceof(File),
  email: z.string().email({ message: 'Please enter a valid email' }),
});

export function UpdateForm() {
  const { data } = useGetCurrentUser();
  const { idToken } = useContext(AuthContext);
  const form = useForm<z.infer<typeof schema>>({
    mode: 'onBlur',
    defaultValues: {
      name: data ? data.name : '',
      socials: data ? data.socials : '',
      bio: data ? data.bio : '',
      email: data ? data.email : '',
    },
  });
  const { handleSubmit, control } = form;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ['update-profile', data?._id, idToken],
    () => updateUser(form.getValues(), data?._id!, idToken),
    {
      onError: (error) => {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'An unexpected error occured',
          description: 'Check the console for more information',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['current-user', idToken] });
        toast({
          title: 'Successfully updated',
        });
      },
    },
  );

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    if (data?._id && idToken !== '') {
      mutate();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-24 max-w-screen-lg"
      >
        <div className="mb-10 rounded border border-slate-200 p-10">
          <div className="flex gap-4">
            <div>
              <div>
                <FormField
                  control={control}
                  name="profile"
                  render={({ field }) => {
                    const { value, onChange, ...rest } = field;
                    return (
                      <FormItem className="pb-4">
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            type="file"
                            onChange={(event) => {
                              if (event.target.files) {
                                onChange(event.target.files[0]);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="grow">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grow">
              <FormField
                control={control}
                name="socials"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Where people can find you</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://" type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <hr className="border-b-1 my-8 border-slate-200" />
          <FormField
            control={control}
            name="bio"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem className="pb-4">
                  <FormLabel>Your Bio</FormLabel>
                  <FormControl>
                    <TinyMCE
                      {...rest}
                      onEditorChange={(value, editor) => {
                        onChange(value);
                      }}
                      init={{
                        className: 'w-full input-field mb-2',
                        placeholder: 'Something about yourself...',
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <hr className="border-b-1 my-8 border-slate-200" />
          <Button
            className="rounded bg-black px-5 leading-10 text-white"
            type="submit"
            disabled={data === undefined || idToken === '' || isLoading}
          >
            {data === undefined || idToken === ''
              ? 'Please Sign In'
              : 'Update Your Bio'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
