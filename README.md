# Reimagined parakeet

This project is a next application. To run the development server, do:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Project outline

#### Plan

- [x] Create a simple plan to get a broad overview over the assignment.

#### Read documentation

- read NextJs documentation to get familiar with it.
- read Contentful documentation to get familiar with it.

#### Development environment (linting, formatting, folder structure)

create nextJs already comes with a good eslint configuration. Most likely no changes needed for this kind of project.

- [ ] prettier configuration?
- [x] decide a folder structure

#### Secrets

A simple .env file to keep secrets seems good enough.

- [x] create a ".env" file
- [x] create a ".env.template" file

#### Data-fetching

The tasks specifies that we should fetch the faq from a Contentful API.

- [ ] postman workspace
- [ ] decide to use GraphQL or REST. (task assignee asks for GraphQL, but OK to use REST)

REST:

- no automatic types (which i would get from graphQL-codegen) - might have to implement zod.
- the assignee (me) wants to use GraphQL

GraphQL:

- graphQL-codegen and graphql-request makes development pretty nice.
- the assignee (me) wants to use it.
- the assignor encourages to use it.

- [ ] error handling
- [ ] log system (optional)

#### Data-visualizing

The FAQ's should be displayed as accordions. Decide to implement the accordions with or without any third party package.
Tailwindcss is already configured.

- [ ] implement a simple design system. (tokenization)
- [ ] use "React-aria-components" library for the main component. (great for accessibility).
- [ ] loading (skeleton?, spinner?)
- [ ] tests
- [ ] dark mode (optional - should be simple to implement by using design tokens)
- [ ] animations (optional)

#### SEO

Simple meta tags should be enough for this "one page" application.
