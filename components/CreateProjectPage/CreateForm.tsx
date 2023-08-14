import { AuthContext } from "@/components/AuthProvider";
import { ProjectSection } from "@/components/CreateProjectPage/ProjectSection";
import { SupportSection } from "@/components/CreateProjectPage/SupportSection";
import { TeamSection } from "@/components/CreateProjectPage/TeamSection";
import { chains } from "@/components/Web3Provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import { useAccount, useEnsAddress, useMutation, useQuery } from "wagmi";
import * as z from "zod";
import { CrowdFundSection } from "./CrowdFundSection";
import { MilestoneSection } from "./MilestoneSection";
import { useGetPools } from "@/hooks/useGetPools";

async function createProject(
  idToken: string,
  values: z.infer<typeof createFormSchema> & { pool?: string }
) {
  const finalValues = {
    ...values,
    mint_end_date: values.mint_end_date.toISOString(),
    tags: values.tags.split(",").map((tag) => tag.trim()),
  };
  if (finalValues.thumbnail) {
    const formData = new FormData();
    formData.append("thumbnail", finalValues.thumbnail);
    formData.append(
      "payload_json",
      JSON.stringify({
        ...finalValues,
        thumbnail: finalValues.thumbnail.name,
      })
    );
    const res = await fetch(`${process.env.BACKEND_URL}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: formData,
    });
    return await res.json();
  } else {
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
  thumbnail: z.optional(z.instanceof(File)),
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
    .refine(
      (address) => {
        try {
          // isAddress throws an error
          return isAddress(address) || address.endsWith(".eth");
        } catch (e) {
          return false;
        }
      },
      {
        message: "Invalid address",
      }
    ),
});

export function CreateForm() {
  const { address } = useAccount();
  const { idToken } = useContext(AuthContext);
  const { data: pools } = useGetPools();

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      video_url: "",
      tldr: "",
      brief: "",
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
    formState: { errors, isValid, isDirty },
  } = form;
  const fee = watch("edition_price");
  const admin_address = watch("admin_address");
  const video_url = watch("video_url");
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
  } = useMutation(
    ["submit-project"],
    () => {
      const values = form.getValues();
      if (admin_address.endsWith(".eth")) {
        values.admin_address = ensAddressData || admin_address;
      }
      const newValues = {
        ...values,
        pool: values.brief,
        brief: pools?.find((pool) => pool._id === values.brief)!.title!,
      };
      return createProject(idToken, newValues);
    },
    {
      onError: (e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "An unexpected error occured",
          description: "Check the console for more information",
        });
      },
    }
  );
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
        generateVideoThumbnail(video_url)
      ),
    {
      enabled:
        Boolean(createProjectData?._id) &&
        Boolean(admin_address) &&
        Boolean(title) &&
        Boolean(video_url),
    }
  );
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    // print form errors
    if (errors) {
      console.error({ errors, values });
    }

    await mutateAsync();
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
        <MilestoneSection />
        <CrowdFundSection />
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
