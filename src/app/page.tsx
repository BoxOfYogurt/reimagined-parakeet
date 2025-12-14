import { Suspense } from 'react';
import { ContentfulGraphQLClientImpl } from '@/clients/contentfulGraphqlClient';
import {
  AccordionTeaserBlock,
  AccordionTeaserBlockSkeleton,
} from '@/cms/blocks/AccordionTeaserBlock';
import { ApplicationLayout } from '@/library';

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Novacare technical assignment startpage</h1>
      <section aria-labelledby="introduction" className="mb-5 pt-5">
        <ApplicationLayout width="small">
          <h2
            id="introduction"
            className="typography-heading-sm-bold lg:typography-heading-base-bold text-heading my-5 scroll-mt-2"
          >
            Introduction
          </h2>
          <p className="typography-long-base-regular">
            This Next.js app fetches FAQ content from Contentful using a GraphQL SDK and renders it
            with a reusable Accordion component. The codebase is structured by feature: GraphQL
            fragments and queries live under <code>src/graphql</code>, a typed SDK in{' '}
            <code>src/graphql/sdk</code> powers data access, and UI is composed from small,
            theme-aware components in <code>src/library</code>. Styling relies on CSS variables and
            utility classes in <code>src/styles</code> for a consistent visual profile, while
            TypeScript types in <code>src/types</code> keep the data layer safe and easy to extend.
          </p>
        </ApplicationLayout>
      </section>
      <section aria-labelledby="assignment" className="my-5">
        <ApplicationLayout width="small">
          <h2
            id="assignment"
            className="typography-heading-sm-bold lg:typography-heading-base-bold text-heading my-5 scroll-mt-2"
          >
            Assignment
          </h2>
          <p className="typography-long-base-regular">
            Create an application that fetches Frequently asked Questions from an contentful CMS.
            And displays them in a <strong>“accordion”</strong> component. The project should be
            structured, with focus on code quality, visual profile and ease of further development.
          </p>
        </ApplicationLayout>
      </section>

      <section aria-labelledby="faq" className="mt-10">
        <ApplicationLayout width="small">
          <h2
            id="faq"
            className="typography-heading-sm-regular lg:typography-heading-base-regular text-heading my-5 scroll-mt-2"
          >
            Need answers?
          </h2>
          <Suspense fallback={<AccordionTeaserListSkeleton numberOfSkeletons={1} />}>
            <AccordionTeaserList />
          </Suspense>
        </ApplicationLayout>
      </section>
    </>
  );
}

export const AccordionTeaserList = async () => {
  const client = new ContentfulGraphQLClientImpl();
  const safeResponse = await client.getAccordionTeaserCollection();

  return (
    <>
      {safeResponse.success ? (
        <ul>
          {safeResponse.data.accordionCollection?.items.map(
            (item) =>
              item && (
                <li key={item.sys.id}>
                  <AccordionTeaserBlock
                    key={item.sys.id}
                    sys={{ id: item.sys.id }}
                    title={item.title}
                    url={`faq/${item.sys.id}`}
                  />
                </li>
              ),
          )}
        </ul>
      ) : (
        <div>
          <p className="typography-short-base-regular">
            Seems we encountered an error getting the answers...
          </p>
        </div>
      )}
    </>
  );
};

type AccordionTeaserBlockSkeletonProps = {
  numberOfSkeletons: number;
};

const AccordionTeaserListSkeleton = ({
  numberOfSkeletons = 1,
}: AccordionTeaserBlockSkeletonProps) => {
  const skeletons = new Array(numberOfSkeletons).fill(null);

  return (
    <ul className="space-y-2">
      {skeletons.map((_, index) => (
        <li key={index}>
          <AccordionTeaserBlockSkeleton />
        </li>
      ))}
    </ul>
  );
};
