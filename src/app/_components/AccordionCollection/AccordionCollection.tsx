import { notFound } from 'next/navigation';
import { ContentfulGraphQLClientImpl } from '@/clients';
import { AccordionBlock } from '@/cms/blocks';
import { ApplicationLayout } from '@/library';

export const AccordionCollection = async () => {
  const client = new ContentfulGraphQLClientImpl();

  const safeAccordionResponse = await client.getAccordionCollection();

  if (
    !safeAccordionResponse.success ||
    !safeAccordionResponse.data.accordionCollection?.items.length
  ) {
    notFound();
  }

  const accordionCollectionItems = safeAccordionResponse.data.accordionCollection?.items;
  return (
    <ApplicationLayout width="small">
      {accordionCollectionItems?.map((item) =>
        item ? <AccordionBlock key={item.sys.id} {...item} /> : null,
      )}
    </ApplicationLayout>
  );
};
