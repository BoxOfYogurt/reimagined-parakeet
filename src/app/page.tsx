import { Suspense } from 'react';
import { AccordionCollection, AccordionCollectionSkeleton, TextSection } from '@/app/_components';
import { ApplicationLayout } from '@/library';

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Novacare technical assignment startpage</h1>
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
        <ApplicationLayout width="small">
          <Suspense fallback={<AccordionCollectionSkeleton numberOfSkeletons={3} />}>
            <AccordionCollection />
          </Suspense>
        </ApplicationLayout>
      </section>
    </>
  );
}
