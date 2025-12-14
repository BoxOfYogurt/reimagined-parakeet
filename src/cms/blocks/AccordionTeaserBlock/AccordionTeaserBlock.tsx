"use client";

import { AccordionTeaserBlockFragment } from "@/graphql/sdk/sdk";
import { ArrowRightIcon } from "@/icons/ArrowRightIcon";
import Link from "next/link";
import { Heading } from "react-aria-components";

type AccordionTeaserBlockProps = AccordionTeaserBlockFragment & {
  url: string;
};

export const AccordionTeaserBlock = ({
  title,
  url,
}: AccordionTeaserBlockProps) => {
  return (
    <div className="relative rounded-xl h-16 px-5 bg-surface-sunken flex items-center justify-between">
      <Heading className="typography-short-2xl-bold">{title}</Heading>
      <Link
        href={url}
        aria-label={`gå til ${title}`}
        className="hover:underline before:absolute before:inset-0 font-mono text-text-on-surface-secondary"
      >
        <span className="text-2xl">
          <ArrowRightIcon />
        </span>
      </Link>
    </div>
  );
};
