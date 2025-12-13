import { toSafeHtmlId } from "@/cms/helpers/toSafeHtmlId";
import { AccordionFragment } from "@/graphql/sdk/sdk";
import {
  DisclosureGroup,
  Disclosure,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/library";
import cx from "classix";

type AccordionBlock = AccordionFragment & {
  className?: string;
};

export const AccordionBlock = ({
  sys,
  title,
  internalName,
  accordionItemsCollection,
  className,
}: AccordionBlock) => {
  const htmlId = toSafeHtmlId(title || internalName || sys.id);
  return (
    <div className={className}>
      <h2
        id={htmlId}
        className="typography-heading-sm-bold my-5 text-heading scroll-mt-2"
      >
        {title || internalName}
      </h2>

      {accordionItemsCollection ? (
        <DisclosureGroup
          id={sys.id}
          allowsMultipleExpanded
          className="space-y-3"
        >
          {accordionItemsCollection.items.map(
            (item) =>
              item && (
                <Disclosure key={item.sys.id} id={item.sys.id}>
                  <DisclosureTrigger
                    className={cx(
                      "pl-3 py-3 group-data-[expanded=true]/disclosure-root:border-b border-b-0 border-border-neutral w-full text-left group-data-[expanded=true]/disclosure-root:rounded-b-none rounded-lg bg-surface-sunken typography-short-lg-bold"
                    )}
                  >
                    {item.name}
                  </DisclosureTrigger>
                  <DisclosurePanel className="bg-surface-sunken rounded-b-lg typography-long-lg-regular">
                    <div className="p-5">{item.text}</div>
                  </DisclosurePanel>
                </Disclosure>
              )
          )}
        </DisclosureGroup>
      ) : null}
    </div>
  );
};
