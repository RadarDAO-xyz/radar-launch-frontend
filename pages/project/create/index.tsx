import { MilestoneFields } from "@/components/MilestoneFields";
import { RepeatingField } from "@/components/RepeatingField";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Brief } from "@/types/mongo";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAccount, useMutation, useNetwork, useQuery } from "wagmi";
import * as z from "zod";
import { TeamFields } from "../../../components/TeamFields";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { isAddress } from "viem";

async function createProject(
  idToken: string,
  values: z.infer<typeof formSchema>
) {
  const res = await fetch(`${process.env.BACKEND_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(values),
  });
  return await res.json();
}

async function getCheckoutLink(
  fee: number,
  address: string,
  id: string
): Promise<string> {
  try {
    const result = await fetch(`/api/get-checkout-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fee,
        address,
        id,
      }),
    }).then((res) => res.json());

    if ("checkoutLinkIntentUrl" in result) {
      return result.checkoutLinkIntentUrl;
    }
  } catch (e) {
    console.error(e);
  }
  return "";
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  video_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(1, { message: "Video URL is required" }),
  tldr: z.string().min(1, { message: "Brief description is required" }),
  video_image: z.string(),
  brief: z.string().min(1, { message: "Brief is required" }),
  inspiration: z.string().min(1, { message: "Inspiration is required" }),
  team: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      bio: z.string().min(1, { message: "Bio is required" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email" })
        .min(1, { message: "Email is required" }),
    })
  ),
  collaborators: z.string(),
  waitlist: z.boolean().default(true),
  milestones: z.array(
    z.object({
      amount: z.coerce.number(),
      // .min(0, { message: "Amount is required" }),
      text: z.string(),
      // .min(1, { message: "Milestone description is required" }),
    })
  ),
  edition_price: z.coerce.number(),
  mint_end_date: z.date().min(new Date(), {
    message: "Must end later than today",
  }),
  benefits: z.array(
    z.object({
      amount: z.coerce.number(),
      text: z.string(),
    })
  ),
  admin_address: z
    .string()
    .min(1, { message: "Admin address is required" })
    .refine(isAddress, { message: "Invalid address" }),
});

export default function ProjectForm() {
  const { address } = useAccount();
  const { idToken } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      video_url: "",
      tldr: "",
      brief: "",
      video_image: "",
      inspiration: "",
      team: [],
      collaborators: "",
      waitlist: true,
      milestones: [],
      edition_price: 0,
      mint_end_date: new Date(),
      benefits: [],
      // @ts-expect-error "" is not of type Address
      admin_address: address || "",
    },
  });
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isDirty },
  } = form;
  const fee = watch("edition_price");
  const admin_address = watch("admin_address");

  const {
    data: createProjectData,
    mutateAsync,
    isLoading: isSubmitLoading,
    isSuccess: isSubmitSuccess,
  } = useMutation(["submit-project"], () =>
    createProject(idToken, form.getValues())
  );
  const { data: checkoutLink, isLoading: isCheckoutLinkLoading } = useQuery(
    ["checkout-link", fee, createProjectData?._id, admin_address],
    () => getCheckoutLink(fee, admin_address, createProjectData._id),
    { enabled: Boolean(createProjectData?._id) }
  );
  console.log({ checkoutLink, createProjectData });
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // print form errors
    if (errors) {
      console.error(errors);
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

  useEffect(() => {
    if (isSubmitSuccess && createProjectData && checkoutLink) {
      toast({
        title: "Redirecting to Paper for payment...",
      });
      setTimeout(() => {
        router.push(checkoutLink);
      }, 2000);
    }
  }, [isSubmitSuccess, createProjectData, toast, router, checkoutLink]);

  return (
    <Form {...form}>
      <form
        id="create-project"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto mt-40"
        // @ts-expect-error For netlify forms
        netlify
      >
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>The Project</h1>
          <p className="form-subheading">
            {"Hey there future maker, what's your project?"}
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Basic Info</h2>
              <p>
                Write a Clear and Concise Title and Subtitle for Your Project
                <br />
                <br />
                Your project title and subtitle will appear on your project and pre-launch pages, as well as in category pages, search results, and emails we send to our community. Make sure they accurately represent your project and are easy to understand for potential supporters.
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>What is the name of your project?</FormLabel>
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your idea in a sentence</FormLabel>
                    <FormDescription className="text-xs">
                      This will be featured on homepage alongside your video
                    </FormDescription>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Summary</h2>
              <p>
                Please provide a brief summary that will motivate supporters to believe in your vision. Be genuine rather than polished!
                <br />
                <br />
                Explain what you aim to achieve with the funding, how you intend to accomplish it, who you are, and why this project is important to you. Demonstrations and step-by-step guides are highly effective!
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name="video_url"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Share a brief 3-minute video through a URL (e.g. Vimeo or YouTube) introducing your vision for a better future.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="tldr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project TLDR</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Video Image</h2>
              <p>
                This image is taken from the thumbnail of your uploaded video.
                <br />
                <br />
                This will appear for collectors in their wallet and on their
                profile.
              </p>
            </div>
            <FormField
              control={control}
              name="video_image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      className="h-full"
                      accept="image/*"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Inspiration</h2>
              <p>
                {"Choose a brief that inspires a playful future, or select one of our partner briefs and explain why you're building it. We'll use this to communicate your vision in any email newsletters, interviews or social campaigns."}
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name="brief"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Select a brief you are answering:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Brief" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(Brief).map((brief) => (
                          <SelectItem key={brief} value={brief}>
                            {brief}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="inspiration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What was the inspiration for this idea?
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>The Team</h1>
          <p className="form-subheading">{"Who's building this project?"}</p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Team</h2>
              <p>
                Please add your team members names and brief bio. Note that your email will not be visible on the platform.
              </p>
            </div>
            <div className="w-1/2">
              <TeamFields />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>Support</h1>
          <p className="form-subheading">What support are you looking for?</p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Collaborators</h2>
              <p>
                Specify the type of collaborators you need, technical or non-technical, advisors, audiences, or allies. Provide a project description to invite people to assist you.
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name="collaborators"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {"List the collaborators you're looking for"}
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      {"Leave blank if you don't need any collaborators"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>Milestones</h1>
          <p className="form-subheading">
            {"What's your roadmap?"}
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Funding Milestones</h2>
              <p>
                We believe that building is an evolutionary process and we need achievable milestones to help reach it, please list your milestones, big or small, if you are crowdfunding, you must reach the amount in milestone 1 to withdraw funds. Otherwise, supporters will receive a refund.
              </p>
              <br />
              <p>
                If you are not crowdfunding, leave the funding amounts blank.
              </p>
            </div>
            <div className="w-1/2">
              <MilestoneFields />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>Crowdfund (Optional)</h1>
          <p className="form-subheading">
            Do you want to crowdfund to reach your milestones, raise capital and offer optional benefits to inspire people to support you?
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Crowdfunding</h2>
              <p>
                We encourage you to focus on smaller fundraising goals to reach impactful milestones, building trust and growing supporters as you go, and crowdraise again at any time for new experiments, ideas and projects on your journey.
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name="waitlist"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>
                      I want to set benefits and crowdfund on Launch
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Editions</h2>
              <p>
                On Launch, projects start with a default edition price of $0.
                <br />
                <br />
                You can offer benefits and set an alternate price for your editions to incentivize supporters.
                <br />
                <br />
                Edition prices are set at a maximum of $20 to make supporting projects accessible.
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name="edition_price"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Edition Price</FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <p>$USD</p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="mint_end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mint End Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Optional Benefits for supporters</h2>
              <p>
                Set benefits for collectors of your editions, this will be
                listed on your project page.
                <br />
                <br />
                Think of incentives to support you, it could be first access to
                a product, a physical redemption, membership to community.
                <br />
                <br />
                At the current time, you cannot offer equity or revenue share
                through Launch.
              </p>
            </div>
            <div className="w-1/2">
              <RepeatingField />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Set your admin address</h2>
              <p>
                Please share an Ethereum address which can withdraw your crowdfund, please ensure you have access to this address.
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name={`admin_address`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Your ETH / ENS address" />
                    </FormControl>
                    <FormDescription>
                      This should start with 0x... or end with .ens
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>Ready to submit</h1>
          <p className="form-subheading">
            What happens next?
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Project Review</h2>
              <p>
                Selected RADAR Community members review proposals and respond within 48 hours. We are unable to provide feedback on unsuccessful briefs but you may re-apply.
              </p>
            </div>
            <div className="w-1/2">
              <h3>Your proposal will be accepted if:</h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>
                  You have answered a brief
                </li>
                <li>
                  {
                    "You have shown you have the skills to execute on your project"
                  }
                </li>
                <li>
                  {"You are building something that people want to be part of"}
                </li>
              </ul>
              <h3>Your proposal will be denied if:</h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>{"You’re not answering the brief"}</li>
                <li>{"Your submissions contains a prohibited item"}</li>
                <li>
                  {"Your selling a purely speculative asset with no utility"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 px-16 pb-20">
          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="w-full">
                  <div>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        disabled={!isValid || !isDirty || !idToken}
                      >
                        Submit
                      </Button>
                    </DialogTrigger>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {!idToken ? (
                    <p>{"Please make sure you're logged in!"}</p>
                  ) : (
                    <p>Please check if you have missed any fields</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Project</DialogTitle>
                <DialogDescription>
                  You will be redirected to a separate website to make payments.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="w-full"
                  disabled={isSubmitLoading || isCheckoutLinkLoading}
                  type="submit"
                  form="create-project"
                >
                  Pay with Paper
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Form>
  );
}
