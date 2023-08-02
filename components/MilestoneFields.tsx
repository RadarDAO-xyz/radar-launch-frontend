"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Row {
  key: string;
}

interface Props {
  children?: ReactNode;
}

export const MilestoneFields = ({ children }: Props) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: "milestones",
    control
  })

  return (
    <fieldset>
      {fields.map((row, index) => (
        <div key={row.id} className="mb-6">
          <FormField
            name={`milestones.${index}.amount`}
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Input {...field} type="number" placeholder="$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`milestones.${index}.text`}
            render={({ field }) => (
              <FormItem >
                <FormControl>
                  <Input {...field} />
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
