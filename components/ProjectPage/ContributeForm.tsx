import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "wagmi";
import { SupportType } from "@/types/mongo";
import { contributeProject, signupProject } from "@/lib/backend";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

interface Props {
  id: string;
}

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  social: z.string(),
  skillset: z.string().min(1, { message: "Please describe your skillset" }),
  contribution: z
    .string()
    .min(1, { message: "Please describe how you would contribute" }),
});

export function ContributeForm({ id }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      social: "",
      skillset: "",
      contribution: "",
    },
  });
  const { toast } = useToast();

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { email, social, skillset, contribution } = watch();

  const { mutateAsync, isSuccess, isLoading } = useMutation(
    ["signup-project", SupportType.CONTRIBUTE, id, email],
    () => contributeProject(id, social, email, skillset, contribution)
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (errors) {
      console.error({ errors, values });
    }
    try {
      await mutateAsync();
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "An unexpected error occured",
        description: "Check the console for more information",
      });
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl text-center pb-6">Help Build this Project</h2>
      {!isSuccess ? (
        <Form {...form}>
          {/* @ts-expect-error Netlify form submission */}
          <form netlify={"true"} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex sm:space-x-4 space-y-4 sm:space-y-0 mb-4 sm:flex-row flex-col">
              <FormField
                control={control}
                name="social"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Social Media" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Your Email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="skillset"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input {...field} placeholder="Your skillset" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="contribution"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="How do you want to contribute?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              APPLY
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
