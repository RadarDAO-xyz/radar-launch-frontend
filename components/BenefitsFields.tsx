import { Input } from "@/components/ui/input";
import { ReactNode, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface Row {
  key: string;
}

interface Props {
  children?: ReactNode;
}

export const BenefitsFields = ({ children }: Props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "benefits",
    control,
  });

  return (
    <fieldset>
      {fields.map((row, index) => (
        <div key={row.id} className="mb-6">
          <FormField
            control={control}
            name={`benefits.${index}.amount`}
            render={({ field }) => (
              <FormItem className="pb-4 flex items-center space-x-4">
                <FormControl>
                  <Input {...field} type="number" placeholder="#" />
                </FormControl>
                <FormLabel className="w-full">editions collected</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`benefits.${index}.text`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        variant={"ghost"}
        type="button"
        className="w-full"
        onClick={append}
      >
        + add another
      </Button>
    </fieldset>
  );
};
