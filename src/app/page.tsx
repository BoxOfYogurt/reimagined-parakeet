import { Suspense } from 'react';
import { AccordionCollection, AccordionCollectionSkeleton, TextSection } from '@/app/_components';

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Novacare technical assignment startpage</h1>
      <TextSection
        id="introduction"
        title="Introduction"
        text={
          <>
            This Next.js app fetches FAQ content from Contentful using a GraphQL SDK and renders it
            with a reusable Accordion component. The codebase is structured by feature: GraphQL
            fragments and queries live under <code>src/graphql</code>, a typed SDK in{' '}
            <code>src/graphql/sdk</code> powers data access, and UI is composed from small,
            theme-aware components in <code>src/library</code>. Styling relies on CSS variables and
            utility classes in <code>src/styles</code> for a consistent visual profile, while
            TypeScript types in <code>src/types</code> keep the data layer safe and easy to extend.
          </>
        }
      />

      <TextSection
        id="assignment"
        title="Assignment"
        text={
          <>
            Create an application that fetches Frequently asked Questions from an contentful CMS.
            And displays them in a <strong>“accordion”</strong> component. The project should be
            structured, with focus on code quality, visual profile and ease of further development.
          </>
        }
      />

      <section className="my-10">
        <Suspense fallback={<AccordionCollectionSkeleton numberOfSkeletons={3} />}>
          <AccordionCollection />
        </Suspense>
      </section>
    </>
  );
}
