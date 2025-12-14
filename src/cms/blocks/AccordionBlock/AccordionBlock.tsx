import { toSafeHtmlId } from '@/cms/helpers/toSafeHtmlId';
import { AccordionBlockFragment } from '@/graphql/sdk/sdk';
import { DisclosureGroup, Disclosure, DisclosurePanel, DisclosureTrigger } from '@/library';
import cx from 'classix';

type AccordionBlock = AccordionBlockFragment & {
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
      <h2 id={htmlId} className="typography-heading-sm-bold text-heading my-5 scroll-mt-2">
        {title || internalName}
      </h2>

      {accordionItemsCollection ? (
        <DisclosureGroup id={sys.id} allowsMultipleExpanded className="space-y-3">
          {accordionItemsCollection.items.map(
            (item) =>
              item && (
                <Disclosure key={item.sys.id} id={item.sys.id}>
                  <DisclosureTrigger
                    className={cx(
                      'border-border-neutral bg-surface-sunken typography-short-lg-bold w-full rounded-lg border-b-0 py-3 pl-3 text-left group-data-[expanded=true]/disclosure-root:rounded-b-none group-data-[expanded=true]/disclosure-root:border-b',
                    )}
                  >
                    {item.name}
                  </DisclosureTrigger>
                  <DisclosurePanel className="bg-surface-sunken typography-long-lg-regular rounded-b-lg">
                    <div className="p-5">{item.text}</div>
                  </DisclosurePanel>
                </Disclosure>
              ),
          )}
        </DisclosureGroup>
      ) : null}
    </div>
  );
};
