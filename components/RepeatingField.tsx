import { Input } from "@/components/ui/input";
import { ReactNode, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/form";
import { Textarea } from "./ui/textarea";

interface Row {
  key: string;
}

interface Props {
  children?: ReactNode;
}

export const RepeatingField = ({ children }: Props) => {
  const { control } = useFormContext();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    setRows([...rows, { key: "default" }]);
  }, []);

  function addRow() {
    let key = "benefits-" + (rows.length + 2);
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
            name={`benefits.${row.key}.amount`}
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
            name={`benefits.${row.key}.text`}
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
        onClick={addRow}
      >
        + add another
      </Button>
    </fieldset>
  );
};
