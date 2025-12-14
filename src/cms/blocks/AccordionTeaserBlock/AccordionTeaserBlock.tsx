"use client";

import { Heading } from "react-aria-components";
import { AccordionTeaserBlockFragment } from "@/graphql/sdk/sdk";
import { ArrowRightIcon } from "@/icons/ArrowRightIcon";
import Link from "next/link";

type AccordionTeaserBlockProps = AccordionTeaserBlockFragment & {
  url: string;
};

export const AccordionTeaserBlock = ({
  title,
  url,
}: AccordionTeaserBlockProps) => {
  return (
    <div className="bg-surface-sunken relative flex h-16 items-center justify-between rounded-xl px-5">
      <Heading className="typography-short-2xl-bold">{title}</Heading>
      <Link
        href={url}
        aria-label={`go to ${title}`}
        className="text-text-on-surface-secondary font-mono before:absolute before:inset-0"
      >
        <span className="text-2xl">
          <ArrowRightIcon />
        </span>
      </Link>
    </div>
  );
};
