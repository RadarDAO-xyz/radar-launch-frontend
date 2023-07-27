import React, { useState, useEffect, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Row {
  key: string;
}

interface Props {
  children?: ReactNode;
}

export const TeamFields = ({ children }: Props) => {
  const [rows, setRows] = useState<Row[]>([]);
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

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
        <div key={index} className="mb-6 space-y-4">
          <FormField
            control={control}
            name={`team.${row.key}.name`}
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
            control={control}
            name={`team.${row.key}.bio`}
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
            control={control}
            name={`team.${row.key}.email`}
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
        onClick={addRow}
      >
        + add another
      </Button>
    </fieldset>
  );
};
