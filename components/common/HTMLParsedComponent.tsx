import { cn } from '@/lib/utils';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
  options?: HTMLReactParserOptions;
}

export function HTMLParsedComponent({
  text,
  className,
  options,
  ...props
}: Props) {
  return (
    <div className={cn('html-parse', className)} {...props}>
      {parse(text, options)}
    </div>
  );
}
