import { getPools } from "@/lib/backend";
import { useFormContext } from "react-hook-form";
import { useQuery } from "wagmi";
import * as z from "zod";
import { TinyMCE } from "../Layout/TinyMCE";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createFormSchema } from "./CreateForm";

const HIDDEN_POOLS = ["64d6184622f75fd347e91906"];

export function ProjectSection() {
  const { control } = useFormContext<z.infer<typeof createFormSchema>>();
  const { data } = useQuery(["pools"], getPools);

  return (
    <div className="border border-slate-200 rounded p-10 mb-10">
      <h1 className="font-base">The Project</h1>
      <p className="form-subheading">
        {"Hey there future maker, what's your project?"}
      </p>
      <hr className="border-b-1 border-slate-200 my-8" />
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 pr-4">
          <h2 className="text-xl font-base">Basic Info</h2>
          <p>
            Write a Clear and Concise Title and Subtitle for Your Project
            <br />
            <br />
            Your project title and subtitle will appear on your project and
            pre-launch pages, as well as in category pages, search results, and
            emails we send to our community. Make sure they accurately represent
            your project and are easy to understand for potential supporters.
          </p>
        </div>
        <div className="col-span-1">
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
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <FormLabel>Describe your idea in a sentence</FormLabel>
                  <FormDescription className="text-xs">
                    This will be featured on homepage alongside your video
                  </FormDescription>
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
        </div>
      </div>
      <hr className="border-b-1 border-slate-200 my-8" />
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 pr-4">
          <h2 className="text-xl font-base">Summary</h2>
          <p>
            Please provide a brief summary that will motivate supporters to
            believe in your vision. Be genuine rather than polished!
            <br />
            <br />
            Explain what you aim to achieve with the funding, how you intend to
            accomplish it, who you are, and why this project is important to
            you. Demonstrations and step-by-step guides are highly effective!
          </p>
        </div>
        <div className="col-span-1">
          <FormField
            control={control}
            name="video_url"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Share a brief 3-minute video through a URL (e.g. Vimeo or
                  YouTube) introducing your vision for a better future.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="tldr"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <FormLabel>Project TLDR</FormLabel>
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
        </div>
      </div>
      <hr className="border-b-1 border-slate-200 my-8" />
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 pr-4">
          <h2 className="text-xl font-base">NFT Image</h2>
          <p>
            Please upload an image to represent your project, make it authentic.
            <br />
            <br />
            This will appear for collectors in their wallet and on their
            profile.
            <br />
            <br />
            Note: you can leave this empty and this image will be taken from the
            thumbnail of your uploaded video.
          </p>
        </div>
        <div className="col-span-1 space-y-2">
          <FormField
            control={control}
            name="thumbnail"
            render={({ field }) => {
              const { value, onChange, ...rest } = field;
              return (
                <FormItem className="w-full h-full">
                  <FormControl>
                    <Input
                      {...rest}
                      type="file"
                      onChange={(event) => {
                        if (event.target.files) {
                          onChange(event.target.files[0]);
                        }
                      }}
                      placeholder="Upload Image"
                      className="w-full h-full file:hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </div>
      <hr className="border-b-1 border-slate-200 my-8" />
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 pr-4">
          <h2 className="text-xl font-base">Inspiration</h2>
          <p>
            {
              "Choose a brief that inspires a playful future, or select one of our partner briefs and explain why you're building it. We'll use this to communicate your vision in any email newsletters, interviews or social campaigns."
            }
          </p>
        </div>
        <div className="col-span-1">
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
                    {data
                      ?.filter((pool) => !HIDDEN_POOLS.includes(pool._id))
                      .map((pool) => (
                        <SelectItem key={pool._id} value={pool._id}>
                          {pool.title}
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
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <FormLabel>What was the inspiration for this idea?</FormLabel>
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
        </div>
      </div>
      <hr className="border-b-1 border-slate-200 my-8" />
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 pr-4">
          <h2 className="text-xl font-base">Tags</h2>
          <p>
            Give your project tags that you believe reflect a future it is
            building towards. These are one word tags like:
          </p>
          <br />
          <p>AI, crypto, worldbuilding, storytelling</p>
        </div>
        <div className="col-span-1">
          <FormField
            control={control}
            name="tags"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel>Enter your tags separated by commas</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
