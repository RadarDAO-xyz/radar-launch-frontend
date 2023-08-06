import { AuthContext } from "@/components/AuthProvider";
import { BenefitsFields } from "@/components/BenefitsFields";
import { ProjectSection } from "@/components/CreateProjectPage/ProjectSection";
import { MilestoneFields } from "@/components/MilestoneFields";
import { TeamFields } from "@/components/CreateProjectPage/TeamFields";
import { chains } from "@/components/Web3Provider";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { VIMEO_REGEX, YOUTUBE_REGEX } from "@/constants/regex";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import { useAccount, useEnsAddress, useMutation, useQuery } from "wagmi";
import * as z from "zod";
import { TeamSection } from "@/components/CreateProjectPage/TeamSection";
import { SupportSection } from "@/components/CreateProjectPage/SupportSection";

interface CreateProjectValues
  extends Omit<z.infer<typeof createFormSchema>, "mint_end_date" | "tags"> {
  mint_end_date: string;
  tags: string[];
}

async function createProject(
  idToken: string,
  values: z.infer<typeof createFormSchema>
) {
  const finalValues: CreateProjectValues = {
    ...values,
    mint_end_date: values.mint_end_date.toISOString(),
    tags: values.tags.split(",").map((tag) => tag.trim()),
  };
  const res = await fetch(`${process.env.BACKEND_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(finalValues),
  });
  return await res.json();
}

async function getCheckoutLink(
  fee: number,
  address: string,
  id: string,
  title: string,
  imageUrl: string
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
        title,
        imageUrl,
      }),
    }).then((res) => res.json());
    console.log(result);

    if ("checkoutLinkIntentUrl" in result) {
      return result.checkoutLinkIntentUrl;
    }
  } catch (e) {
    console.error(e);
  }
  return "";
}

export const createFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  video_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(1, { message: "Video URL is required" }),
  tldr: z.string().min(1, { message: "Brief description is required" }),
  video_image: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine(
      (url) =>
        YOUTUBE_REGEX.exec(url) !== null || VIMEO_REGEX.exec(url) !== null,
      {
        message:
          "Invalid YouTube and Vimeo link, e.g. https://www.youtube.com/watch?v=wy8tgRbHN1U",
      }
    ),
  brief: z.string().min(1, { message: "Brief is required" }),
  inspiration: z.string().min(1, { message: "Inspiration is required" }),
  team: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      bio: z.string().min(1, { message: "Bio is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email" }),
    })
  ),
  tags: z.string(),
  collaborators: z.string(),
  waitlist: z.boolean().default(true),
  milestones: z.array(
    z.object({
      amount: z.string().min(1, { message: "Milestone is required" }),
      text: z.string().min(1, { message: "Milestone description is required" }),
    })
  ),
  edition_price: z.coerce
    .number()
    .min(0, { message: "Edition price too small, minimum 0" })
    .max(20, { message: "Edition price too large, maximum 20" }),
  mint_end_date: z.date().refine((current) => current > new Date(), {
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
    .refine((address) => isAddress(address) || address.endsWith(".eth"), {
      message: "Invalid address",
    }),
});

export default function ProjectForm() {
  const { address } = useAccount();
  const { idToken } = useContext(AuthContext);

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      video_url: "",
      tldr: "",
      brief: "",
      video_image: "",
      inspiration: "",
      team: [
        {
          name: "",
          bio: "",
          email: "",
        },
      ],
      collaborators: "",
      waitlist: true,
      milestones: [],
      edition_price: 0,
      mint_end_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      benefits: [],
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
  const video_image = watch("video_image");
  const title = watch("title");

  const { data: ensAddressData } = useEnsAddress({
    name: admin_address,
    chainId: chains[0].id,
    enabled: admin_address.endsWith(".eth"),
  });
  const {
    data: createProjectData,
    mutateAsync,
    isLoading: isSubmitLoading,
    isSuccess: isSubmitSuccess,
  } = useMutation(["submit-project"], () => {
    const values = form.getValues();
    if (admin_address.endsWith(".eth")) {
      values.admin_address = ensAddressData || admin_address;
    }
    values.video_image = generateVideoThumbnail(values.video_image);
    return createProject(idToken, values);
  });
  const { data: checkoutLink, isLoading: isCheckoutLinkLoading } = useQuery(
    [
      "checkout-link",
      fee,
      createProjectData?._id,
      ensAddressData || admin_address,
    ],
    () =>
      getCheckoutLink(
        fee,
        admin_address,
        createProjectData._id,
        title,
        generateVideoThumbnail(video_image)
      ),
    {
      enabled:
        Boolean(createProjectData?._id) &&
        Boolean(admin_address) &&
        Boolean(title) &&
        Boolean(video_image),
    }
  );
  const router = useRouter();
  const { toast } = useToast();

  console.log({ checkoutLink });

  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    // print form errors
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

  if (address === undefined) {
    return (
      <div className="px-[5%] py-12 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <h1>Please login</h1>
      </div>
    );
  }
  // if (!process.env.WHITELISTED_ADDRESSES?.split(" ").some(addr => address.toLowerCase() === addr.toLowerCase())) {
  //   return <div className="px-[5%] py-12"><h1>Not Authorized</h1></div>
  // }

  return (
    <Form {...form}>
      <form
        id="create-project"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto mt-24"
        // @ts-expect-error For netlify forms
        netlify="true"
      >
        <ProjectSection />
        <TeamSection />
        <SupportSection />
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1 className="font-base">Milestones</h1>
          <p className="form-subheading">{"What's your roadmap?"}</p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1 pr-4">
              <h2 className="text-xl font-base">Funding Milestones</h2>
              <p>
                We believe that building is an evolutionary process and we need
                achievable milestones to help reach it, please list your
                milestones, big or small, if you are crowdfunding, you must
                reach the amount in milestone 1 to withdraw funds. Otherwise,
                supporters will receive a refund.
              </p>
              <br />
              <p>
                If you are not crowdfunding, leave the funding amounts blank.
              </p>
            </div>
            <div className="col-span-1">
              <MilestoneFields />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1 className="font-base">Crowdfund (Optional)</h1>
          <p className="form-subheading">
            Do you want to crowdfund to reach your milestones, raise capital and
            offer optional benefits to inspire people to support you?
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1 pr-4">
              <h2 className="text-xl font-base">Crowdfunding</h2>
              <p>
                We encourage you to focus on smaller fundraising goals to reach
                impactful milestones, building trust and growing supporters as
                you go, and crowdraise again at any time for new experiments,
                ideas and projects on your journey.
              </p>
            </div>
            <div className="col-span-1">
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
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1 pr-4">
              <h2 className="text-xl font-base">Editions</h2>
              <p>
                On Launch, projects start with a default edition price of $0.
                <br />
                <br />
                You can offer benefits and set an alternate price for your
                editions to incentivize supporters.
                <br />
                <br />
                Edition prices are set at a maximum of $20 to make supporting
                projects accessible.
              </p>
            </div>
            <div className="col-span-1">
              <FormField
                control={control}
                name="edition_price"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Edition Price</FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input type="number" placeholder="0-20" {...field} />
                      </FormControl>
                      <p>$USD</p>
                    </div>
                    <FormMessage />
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
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1 pr-4">
              <h2 className="text-xl font-base">
                Optional Benefits for supporters
              </h2>
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
            <div className="col-span-1">
              <BenefitsFields />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1 pr-4">
              <h2 className="text-xl font-base">Set your admin address</h2>
              <p>
                Please share an Ethereum address which can withdraw your
                crowdfund, please ensure you have access to this address.
              </p>
            </div>
            <div className="col-span-1">
              <FormField
                control={control}
                name={`admin_address`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Your ETH / ENS address" />
                    </FormControl>
                    <FormDescription>
                      This should start with 0x... or end with .eth
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1 className="font-base">Ready to submit</h1>
          <p className="form-subheading">What happens next?</p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1 pr-4">
              <h2 className="text-xl font-base">Project Review</h2>
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
                    "You have shown you have the skills to execute on your project"
                  }
                </li>
                <li>
                  {"You are building something that people want to be part of"}
                </li>
              </ul>
              <h3 className="mt-4">Your proposal will be denied if:</h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>{"You're not answering the brief"}</li>
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
              <DialogFooter className="flex space-x-0 space-y-2 sm:flex-col sm:space-x-0">
                <Button asChild variant="ghost">
                  <Link
                    href="https://airtable.com/appGvDqIhUSP0caqo/shrkX6fnUJrcYreUy"
                    target="_blank"
                  >
                    Join our Email Newsletter
                  </Link>
                </Button>
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
