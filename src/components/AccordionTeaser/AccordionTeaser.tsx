import { AccordionTeaserFragment } from "@/graphql/sdk/sdk";
import Link from "next/link";

export type AccordionTeaserProps = AccordionTeaserFragment & {
  url: string;
};

export const AccordionTeaser = ({ title, url }: AccordionTeaserProps) => {
  return (
    <div className="relative rounded-xl p-5 drop-shadow-2xl bg-surface-secondary max-w-2xl">
      <h2 className="font-bold text-2xl md:text-4xl font-mono mb-4">{title}</h2>
      <Link
        href={url}
        aria-label={`gå til ${title}`}
        className="hover:underline before:absolute before:inset-0 font-mono text-text-on-surface-secondary"
      >
        Se mer
      </Link>
    </div>
  );
};
