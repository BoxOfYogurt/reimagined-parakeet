import { ApplicationLayout } from "@/library";

export default function Home() {
  return (
    <>
      <section aria-labelledby="introduction" className="mb-5 pt-5">
        <ApplicationLayout width="small">
          <h2
            id="introduction"
            className="typography-heading-base-bold my-5 text-heading scroll-mt-2"
          >
            Introduction
          </h2>
          <p className="typography-long-base-regular">
            This Next.js app fetches FAQ content from Contentful using a GraphQL
            SDK and renders it with a reusable Accordion component. The codebase
            is structured by feature: GraphQL fragments and queries live under{" "}
            <code>src/graphql</code>, a typed SDK in{" "}
            <code>src/graphql/sdk</code> powers data access, and UI is composed
            from small, theme-aware components in <code>src/library</code>.
            Styling relies on CSS variables and utility classes in{" "}
            <code>src/styles</code> for a consistent visual profile, while
            TypeScript types in <code>src/types</code> keep the data layer safe
            and easy to extend.
          </p>
        </ApplicationLayout>
      </section>
      <section aria-labelledby="assignment" className="my-5">
        <ApplicationLayout width="small">
          <h2
            id="assignment"
            className="typography-heading-base-bold my-5 text-heading scroll-mt-2"
          >
            Assignment
          </h2>
          <p className="typography-long-base-regular">
            Create an application that fetches Frequently asked Questions from
            an contentful CMS. And displays them in a{" "}
            <strong>“accordion”</strong> component. The project should be
            structured, with focus on code quality, visual profile and ease of
            further development.
          </p>
        </ApplicationLayout>
      </section>

      <section aria-labelledby="faq" className="mt-10">
        <ApplicationLayout width="regular">
          <h2 id="faq" className="typography-heading-sm-bold my-5 scroll-mt-2">
            FAQ
          </h2>
          <p>A link to the page that renders the FAQ should be here...</p>
        </ApplicationLayout>
      </section>
    </>
  );
}
