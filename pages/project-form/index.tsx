import { MilestoneFields } from "@/components/MilestoneFields";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubmissionReadytoSubmit } from "@/devlink/SubmissionReadytoSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TeamFields } from "../../components/TeamFields";
import { Brief } from "@/types/mongo";

const formSchema = z.object({
  title: z.string(),
  video_url: z.string(),
  tldr: z.string(),
  brief: z.string(),
  inspiration: z.string(),
  team: z.array(z.string()),
  collaborators: z.string(),
  waitlist: z.boolean(),
  milestones: z.array(z.string()),
  edition_price: z.number(),
  mint_end_date: z.string(),
  benefits: z.array(z.string()),
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
      mint_end_date: "",
      benefits: [],
      admin_address: "",
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-md mx-auto mt-40"
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
              control={form.control}
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
                control={form.control}
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
                control={form.control}
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
              <h2>Team</h2>
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
              <h2>Collaborators</h2>
              <p>
                Do you want to find collaborators on your project? This will
                appear in your project description for people to apply to help
                you build, leave blank if you are not looking for collaborators
              </p>
            </div>
            <div className="w-1/2">
              <input
                {...register(`collaborators`)}
                className="w-full input-field mb-2"
                placeholder="Collaborators"
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
              <h2>Funding Milestones</h2>
              <p>
                We believe that building is an evolutionary process. Roadmaps
                are important, but we also want to set achievable milestones.
              </p>
              <p>
                Fill out milestones you&apos;re hoping to achieve in your
                projects, big or small.
              </p>
              <p>
                Leave the funding amount blank if you&apos;re not looking to
                crowdfund.
              </p>
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
              <h2>Crowdfunding</h2>
              <p>
                At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque
                pellentesque orci, in blandit nisi finibus pellentesque.
              </p>
            </div>
            <div className="w-1/2">
              <input {...register(`waitlist`)} id="waitlist" type="checkbox" />
              <label htmlFor="waitlist">
                I want to set benefits and crowdfund on Launch
              </label>
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Editions</h2>
              <p>
                At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque
                pellentesque orci, in blandit nisi finibus pellentesque.
              </p>
            </div>
            <div className="w-1/2">
              <input
                {...register(`edition_price`)}
                className="w-full input-field mb-2"
                type="number"
              />{" "}
              ETH
              <input
                {...register(`mint_end_date`)}
                className="w-full input-field mb-2"
                placeholder="End Date"
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Optional Benefits for supporters</h2>
              <p>Onchain patronage will by default be listed as a benefit.</p>
            </div>
            <div className="w-1/2">repeatable field</div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Set your admin address</h2>
              <p>
                Please share an address which can withdraw your crowdfunded
                money. Make sure you have access to this address. In the current
                version this cannot be a safe address.
              </p>
            </div>
            <div className="w-1/2">
              <input
                {...register(`admin_address`)}
                className="w-full input-field mb-2"
                placeholder="Your ETH / ENS address"
              />
            </div>
          </div>
        </div>

        <SubmissionReadytoSubmit />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}
