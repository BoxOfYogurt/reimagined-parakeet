# Reimagined Parakeet

Novacare technical assignment

A Next.js (App Router) application that fetches FAQ content from Contentful via GraphQL and renders it using accessible, reusable UI components.

## Quick Start

- Install dependencies: `npm install`
- To get the actual data, you need to create `.env` file with Contentful credentials.
- Start dev server:

  ```bash
  npm run dev
  ```

- Open `http://localhost:3000` in your browser.

## Environment

Create a `.env` based on `.env.template` and add your Contentful credentials.
Do not commit real secrets. `.env` is git-ignored.

## Architecture

- App Router: Pages and layouts under `src/app` (server components by default).
- Data Layer: Contentful GraphQL client in `src/clients/contentfulGraphqlClient` and queries/fragments in `src/graphql`. Fragments for cms blocks are located together. `src/cms/blocks/*`
- Typed SDK: Generated/typed helpers in `src/graphql/sdk` for safe data access.
- UI Components: Reusable, theme-aware components in `src/library` and `src/components`.
- Styling: Design tokens (CSS variables) and utilities in `src/styles`.
- Types: Shared TypeScript models in `src/types`.

## Tech Stack

- Next.js App Router (React 18)
- TypeScript
- Contentful (GraphQL)
- `graphql-request` + typed SDK in `src/graphql/sdk`
- `react-aria-components` for accessible UI primitives
- Tailwind CSS v4 + custom CSS variables in `src/styles/theme`

## Development

- Linting: Next.js includes ESLint; project uses TypeScript.
- Formatting: Prettier
- CSS: Tailwind v4 utilities + custom tokens; theme files live in `src/styles/theme`.
- Accessibility: Components leverage `react-aria-components` for semantics and keyboard support.

## Data Fetching Pattern

- Fetch in server components for security and performance.
- Example: `AccordionTeaserList` (server component) calls the Contentful client and renders blocks.
- For reuse across routes, colocate server components under `src/app/_components` or keep them near their route.
- If you need a client boundary, expose a route handler under `src/app/api/...` and fetch from the client.

## Scripts

- `npm run dev`: Start local development
- `npm run build`: Production build
- `npm start`: Run built app
- `npm gen:graphql:sdk`: Generate the GraphQL SDK.
