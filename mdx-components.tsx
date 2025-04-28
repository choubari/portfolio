import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactTweet } from "./components/mdx/react-tweet";

type HeadingProps = ComponentPropsWithoutRef<"h1"> & { className?: string };
type ParagraphProps = ComponentPropsWithoutRef<"p"> & { className?: string };
type ListProps = ComponentPropsWithoutRef<"ul"> & { className?: string };
type ListItemProps = ComponentPropsWithoutRef<"li"> & { className?: string };
type AnchorProps = ComponentPropsWithoutRef<"a"> & { className?: string };
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote"> & {
  className?: string;
};
type ImageProps = ComponentPropsWithoutRef<"img"> & { className?: string };
type TableProps = ComponentPropsWithoutRef<"table"> & { className?: string };
type TableRowProps = ComponentPropsWithoutRef<"tr"> & { className?: string };
type TableHeaderProps = ComponentPropsWithoutRef<"th"> & { className?: string };
type TableDataProps = ComponentPropsWithoutRef<"td"> & { className?: string };
type PreProps = ComponentPropsWithoutRef<"pre"> & { className?: string };
type CodeProps = ComponentPropsWithoutRef<"code"> & { className?: string };

const components = {
  h1: ({ className, ...props }: HeadingProps) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HeadingProps) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HeadingProps) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: HeadingProps) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: HeadingProps) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: HeadingProps) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ParagraphProps) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ListProps) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  ul: ({ className, ...props }: ListProps) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  li: ({ className, ...props }: ListItemProps) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  a: ({ className, href = "", children, ...props }: AnchorProps) => {
    const baseStyle =
      "font-medium underline underline-offset-4 text-[var(--color-accent)] hover:text-[var(--color-accent)]";
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={cn(baseStyle, className)} {...props}>
          {children}
        </Link>
      );
    }
    if (href.startsWith("#")) {
      return (
        <a href={href} className={cn(baseStyle, className)} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyle, className)}
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-[var(--color-accent)] pl-6 italic [&>*]:text-[var(--color-accent)]",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 md:my-8 border-[var(--color-accent)]" {...props} />
  ),
  table: ({ className, ...props }: TableProps) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: TableRowProps) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: TableHeaderProps) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: TableDataProps) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: PreProps) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border p-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }: CodeProps) => {
    return (
      <code
        className={cn(
          "relative rounded border border-[var(--color-accent)] px-[0.3rem] py-[0.2rem] font-mono text-sm text-[var(--color-accent)]",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  ReactTweet,
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
