import { cn } from "@/lib/utils";
import {
  ReactMarkdown,
  ReactMarkdownOptions,
} from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

function transformText(text: string) {
  // transform \\n to \n
  return text.replace(/\\n/g, "\n");
}

export function Markdown({
  children,
  className,
  ...props
}: ReactMarkdownOptions & {
  className?: string;
}) {
  return (
    <ReactMarkdown
      {...props}
      remarkPlugins={[remarkGfm]}
      className={cn("whitespace-pre-wrap react-markdown", className)}
    >
      {transformText(children)}
    </ReactMarkdown>
  );
}
