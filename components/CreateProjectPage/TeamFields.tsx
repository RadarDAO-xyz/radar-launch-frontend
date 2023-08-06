import { ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  children?: ReactNode;
}

export const TeamFields = ({ children }: Props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "team",
    control,
  });

  return (
    <fieldset>
      {fields.map((row, index) => (
        <div key={row.id} className="mb-6 space-y-4">
          <FormField
            key={row.id + "name"}
            name={`team.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={row.id + "bio"}
            name={`team.${index}.bio`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="Bio" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={row.id + "email"}
            name={`team.${index}.email`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        className="w-full"
        variant={"ghost"}
        onClick={() => append({ name: "", bio: "", email: "" })}
      >
        + add another
      </Button>
    </fieldset>
  );
};
