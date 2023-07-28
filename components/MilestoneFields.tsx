"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
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
  const [rows, setRows] = useState<Row[]>([]);
  const { control } = useFormContext();

  useEffect(() => {
    setRows([...rows, { key: "default" }]);
  }, []);

  function addRow() {
    let key = "milestone-" + (rows.length + 2);
    setRows([...rows, { key }]);
  }

  function removeRow(index: string) {
    if (index !== "default")
      setRows((current) => current.filter((_) => _.key !== index));
  }

  return (
    <fieldset>
      {rows.map((row, index) => (
        <div key={index} className="mb-6">
          <FormField
            control={control}
            name={`milestone.${row.key}.text`}
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`milestone.${row.key}.amount`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" placeholder="$" />
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
        onClick={addRow}
      >
        + add another
      </Button>
    </fieldset>
  );
};
