import { ContentfulGraphQLClientImpl } from '@/clients';
import { AccordionBlock } from '@/cms/blocks';
import { MessageBar } from '@/library';

export const AccordionCollection = async () => {
  const client = new ContentfulGraphQLClientImpl();

  const safeAccordionResponse = await client.getAccordionCollection();

  if (!safeAccordionResponse.success) {
    return (
      <MessageBar title="Error fetching FAQs" variant="error">
        <span className="typography-long-sm-regular text-inherit">
          There was an error while fetching the Frequently Asked Questions.{' '}
          <strong>Please try again later.</strong>
        </span>
      </MessageBar>
    );
  }

  const accordionCollectionItems = safeAccordionResponse.data.accordionCollection?.items;
  return accordionCollectionItems?.map((item) =>
    item ? <AccordionBlock key={item.sys.id} {...item} /> : null,
  );
};
