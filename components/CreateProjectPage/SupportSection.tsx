import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { createFormSchema } from "./CreateForm";
import * as z from "zod";
import { TinyMCE } from "../Layout/TinyMCE";

export function SupportSection() {
  const { control } = useFormContext<z.infer<typeof createFormSchema>>();

  return (
    <div className="border border-slate-200 rounded p-10 mb-10">
      <h1 className="font-base">Support</h1>
      <p className="form-subheading">What support are you looking for?</p>
      <hr className="border-b-1 border-slate-200 my-8" />
      <div className="grid grid-cols-2 gap-10">
        <div className="col-span-1 pr-4">
          <h2 className="text-xl font-base">Collaborators</h2>
          <p>
            Specify the type of collaborators you need, technical or
            non-technical, advisors, audiences, or allies. Provide a project
            description to invite people to assist you.
          </p>
        </div>
        <div className="col-span-1">
          <FormField
            control={control}
            name="collaborators"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <FormLabel>
                    {"List the collaborators you're looking for"}
                  </FormLabel>
                  <FormControl>
                    <TinyMCE
                      {...rest}
                      onEditorChange={(value, editor) => {
                        onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {"Leave blank if you don't need any collaborators"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
