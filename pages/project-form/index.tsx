import { MilestoneFields } from "@/components/MilestoneFields";
import { RepeatingField } from "@/components/RepeatingField";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { SubmissionReadytoSubmit } from "@/devlink/SubmissionReadytoSubmit";
import {
  usePrepareRadarEditionsCreateEdition,
  useRadarEditionsCreateEdition,
} from "@/lib/generated";
import { cn } from "@/lib/utils";
import isTestnet from "@/lib/utils/isTestnet";
import { Brief } from "@/types/mongo";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import * as z from "zod";
import { TeamFields } from "../../components/TeamFields";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

const formSchema = z.object({
  title: z.string(),
  video_url: z.string(),
  tldr: z.string(),
  brief: z.string(),
  inspiration: z.string(),
  team: z.array(
    z.object({
      name: z.string(),
      bio: z.string(),
      email: z.string(),
    })
  ),
  collaborators: z.string(),
  waitlist: z.boolean(),
  milestones: z.array(
    z.object({
      amount: z.coerce.number(),
      text: z.string(),
    })
  ),
  edition_price: z.coerce.number(),
  mint_end_date: z.date(),
  benefits: z.array(
    z.object({
      amount: z.coerce.number(),
      text: z.string(),
    })
  ),
  admin_address: z.string(),
});

export default function ProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      video_url: "",
      tldr: "",
      brief: "",
      inspiration: "",
      team: [],
      collaborators: "",
      waitlist: true,
      milestones: [],
      edition_price: 0,
      mint_end_date: new Date(),
      benefits: [],
      admin_address: "",
    },
  });
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = form;
  const fee = watch("edition_price");

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { config } = usePrepareRadarEditionsCreateEdition({
    account: address,
    chainId: chain?.id,
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    args: [BigInt(fee)],
    enabled: Boolean(chain) && fee > 0,
  });
  const { data, write } = useRadarEditionsCreateEdition(config);
  const { data: txReceipt, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: Boolean(data?.hash),
  });

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // print form errors
    if (errors) {
      console.error(errors);
    }
    
    write?.();
  }

  useEffect(() => {
    if (data?.hash && chain) {
      toast({
        title: "Project submitted, awaiting confirmation",
        description: `Transaction hash: ${data.hash}`,
        action: (
          <ToastAction altText="View on explorer">
            <Link
              href={`${chain.blockExplorers?.default.url}/tx/${data.hash}`}
              target="_blank"
            >
              View Transaction
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [data?.hash]);

  useEffect(() => {
    if (isSuccess && txReceipt?.transactionHash) {
      toast({
        title: "Project successfully submitted!",
      });
    }
  }, [isSuccess]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto mt-40"
      >
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>The Vision</h1>
          <p className="form-subheading">
            Make it easy for people to learn about your vision
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Basic Info</h2>
              <p>
                Write a clear, brief title and subtitle to help people quickly
                understand your project. Both will appear on your project and
                pre-launch pages.
                <br />
                <br />
                Potential supporters will also see them if your project appears
                on category pages, search results, or in emails we send to our
                community.
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
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="brief"
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
                Please give us a TLDR that will inspire supporters of your
                vision, make it authentic rather than polished!
                <br />
                <br />
                Tell people what you&apos;re raising funds to do, how you plan
                to make it happen, who you are, and why you care about this
                project, demos and walkthroughs are great!
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name="video_url"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>
                      Please share a video introducing your vision for a better
                      future
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This should be a maximum of 3 minutes; this must be a URL,
                      you can use vimeo or youtube
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
                    <FormLabel>Describe your idea in a sentence</FormLabel>
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
                This thumbnail is taken from the first slide of your uploaded
                video. <br />
                <br />
                This will appear for collectors in their wallet and on their
                profile.
              </p>
            </div>
            <FormField
              control={control}
              name="tldr"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      className="h-full"
                      accept="video/mp4,video/x-m4v,video/*"
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
                Select a brief inspired a More Play-Full Future, or one of our
                partner briefs and tells us more about why you&apos;re building
                this, we&apos;ll use this in communications to help share your
                vision.
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
                    <FormDescription>
                      {
                        "Chose 'other' if you've been inspired by A More Play-Full Future outside of the briefs"
                      }
                    </FormDescription>
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
          <p className="form-subheading">Who is building the vision</p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Team</h2>
              <p>
                Add your team members and a short bio, your email will not be
                visible on the platform.
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
                Do you want to find collaborators on your project? <br />
                <br />
                This will appear in your project description for people to apply
                to help you build, leave blank if you are not looking for
                collaborators
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
            Set yourself a roadmap to let people know where your vision is
            heading, you can leave the funding amounts blank if you&apos;re not
            looking for capital
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Funding Milestones</h2>
              <p>
                We believe that building is an evolutionary process. Roadmaps
                are important, but we also want to set achievable milestones.
              </p>
              <br />
              <p>
                Fill out milestones you&apos;re hoping to achieve in your
                projects, big or small.
              </p>
              <br />
              <p>
                Leave the funding amount blank if you&apos;re not looking to
                crowdfund.
              </p>
              <br />
              <p>
                Note: you will have to reach milestone 1 to unlock your funds
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
            Raise capital to reach your milestones, set optional benefits to
            inspire people to support
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Crowdfunding</h2>
              <p>
                We know how hard it is for projects to get the resources they
                need to build outside of the current broken funding systems.
                <br />
                <br />
                On Launch, we do crowdfunding a bit differently. We encourage
                you to set realistic crowdfunding goals to reach smaller
                milestones and then come back to raise again.
              </p>
            </div>
            <div className="w-1/2">
              <FormField
                control={control}
                name="waitlist"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox {...field} />
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
                Collecting editions of your vision is how people support you and
                your project. It allows early adopters to signal their believe
                and build reputation around emerging futures.
                <br />
                <br />
                We want to make this as accessible as possible, so there is a
                max price of $20 per edition.
                <br />
                <br />
                To encourage more collections, you can set benefits for
                multiples e.g 5 editions unlocks access to a physical print.
                <br />
                <br />
                See more on editions below.
                <br />
                <br />
                Supporters will be able to collect editions with credit card.
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
                Please share an Ethereum address which can withdraw your
                crowdfunded money.
                <br />
                <br />
                Make sure you have access to this address.
                <br />
                <br />
                In the current version this cannot be a safe address.
                <br />
                <br />
                In the future you will be able to withdraw straight to bank
                account.
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
            Remind yourself of what happens next
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="text-xl">Project Review</h2>
              <p>
                Proposals will be reviewed by selected members of the
                RADAR Community. Expect to receive a decision within 48 hours.
                You can re-apply if unsuccessful however we will not be able to
                answer bespoke feedback for why briefs were not successful.
              </p>
            </div>
            <div className="w-1/2">
              <h3>Your proposal will be accepted if:</h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>
                  They answer a brief or have been inspired by a more play-full
                  future
                </li>
                <li>
                  {
                    "They've shown they have the skills to execute on their vision and that they have an advantage"
                  }
                </li>
                <li>
                  {"They're building something that people want to be part of"}
                </li>
              </ul>
              <h3>Your proposal will be denied if:</h3>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>{"They're not answering the brief"}</li>
                <li>{"They're submissions contains a prohibited item"}</li>
                <li>
                  {"They're selling a purely speculative asset with no utility"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full px-16 pb-20">
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
