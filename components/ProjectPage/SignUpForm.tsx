import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'wagmi';
import { SupportType } from '@/types/mongo';
import { signupProject } from '@/lib/backend';
import { useToast } from '../ui/use-toast';

interface Props {
  id: string;
}

const formSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
});

export function SignUpForm({ id }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const { toast } = useToast();

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const email = watch('email');

  const { mutate, isSuccess, isLoading } = useMutation(
    ['signup-project', SupportType.SIGN_UP, id, email],
    () => signupProject(id, email),
    {
      onError: (e) => {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'An unexpected error occured',
          description: 'Check the console for more information',
        });
      },
    },
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (errors) {
      console.error({ errors, values });
    }
    mutate();
  }
  return (
    <div>
      <h2 className="pb-6 pt-4 text-center font-base text-xl">
        Be the first to use this Project
      </h2>
      {!isSuccess ? (
        <Form {...form}>
          {/* @ts-expect-error Netlify form submission */}
          <form netlify={'true'} onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" loading={isLoading}>
              SIGN UP
            </Button>
          </form>
        </Form>
      ) : (
        <div className="p-4 text-center">
          Thank you! Your submission has been received!
        </div>
      )}
    </div>
  );
}
