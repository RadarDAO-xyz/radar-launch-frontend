import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TinyMCE } from "../Layout/TinyMCE";

export const MilestoneFields = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "milestones",
    control,
  });

  return (
    <fieldset>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-6">
          <FormField
            key={field.id + "amount"}
            name={`milestones.${index}.amount`}
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Input {...field} placeholder="$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={field.id + "text"}
            name={`milestones.${index}.text`}
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
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
      ))}
      <Button
        variant={"ghost"}
        type="button"
        className="w-full"
        onClick={() => append({ amount: "", text: "" })}
      >
        + add another
      </Button>
    </fieldset>
  );
};
