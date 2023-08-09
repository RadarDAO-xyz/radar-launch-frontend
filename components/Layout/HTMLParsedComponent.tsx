import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
}

export function HTMLParsedComponent({ text, className, ...props }: Props) {
  return (
    <div className={cn("html-parse", className)} {...props}>
      {parse(text)}
    </div>
  );
}
