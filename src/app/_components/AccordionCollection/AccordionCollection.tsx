import { ContentfulGraphQLClientImpl } from '@/clients';
import { AccordionBlock } from '@/cms/blocks';
import { ApplicationLayout, MessageBar } from '@/library';

export const AccordionCollection = async () => {
  const client = new ContentfulGraphQLClientImpl();

  const safeAccordionResponse = await client.getAccordionCollection();

  if (!safeAccordionResponse.success) {
    return (
      <ApplicationLayout width="small">
        <MessageBar title="Error fetching FAQs" variant="error">
          <span className="typography-long-sm-regular text-inherit">
            There was an error while fetching the Frequently Asked Questions.{' '}
            <strong>Please try again later.</strong>
          </span>
        </MessageBar>
      </ApplicationLayout>
    );
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
