import cx from 'classix';
import { toSafeHtmlId } from '@/cms/helpers/toSafeHtmlId';
import { AccordionBlockFragment } from '@/graphql/sdk/sdk';
import CaretDownIcon from '@/icons/CaretDownIcon';
import { DisclosureGroup, Disclosure, DisclosurePanel, DisclosureTrigger } from '@/library';

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
    <section aria-labelledby={htmlId} className={className}>
      <h2 id={htmlId} className="typography-heading-sm-bold text-heading my-5 scroll-mt-2 ">
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
                      '-outline-offset-2 outline-border-outline outline-2 rac-focus-visible:outline-solid outline-none',
                      'overflow-hidden text-left border-border-neutral border-2 rac-hover:text-brand-secondary bg-bg-sunken flex items-center typography-short-lg-bold w-full rounded-lg min-h-14 pl-4 group-rac-expanded/disclosure-root:rounded-b-none group-rac-expanded/disclosure-root:border-b-2 group-rac-expanded/disclosure-root:border-border-neutral',
                    )}
                  >
                    <div>{item.name}</div>
                    <span
                      className={cx(
                        'h-full w-14 ml-auto shrink-0 text-[1.75rem] flex items-center justify-center transition-transform duration-200 ease-in-out group-rac-expanded/disclosure-root:rotate-180 text-inherit',
                      )}
                    >
                      <CaretDownIcon />
                    </span>
                  </DisclosureTrigger>
                  <DisclosurePanel className="typography-long-lg-regular bg-bg-sunken border-transparent group-rac-expanded/disclosure-root:border-border-neutral border-2 border-t-0 rounded-b-lg bg-clip-padding">
                    <div className="p-5">{item.text}</div>
                  </DisclosurePanel>
                </Disclosure>
              ),
          )}
        </DisclosureGroup>
      ) : null}
    </section>
  );
};
