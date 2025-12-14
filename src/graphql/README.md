# GraphQL

This readme explains the subfolder's and how they are organized.

## Fragments

Use the `./fragments` folder for shared or utility fragments. Add fragments here when they don’t belong near a specific component, or when they represent a reusable subset of a larger fragment.

## Queries

Use the `./queries` folder for shared, route-agnostic queries. Place queries here when they are reusable across multiple parts of the application or do not belong to a single route. Otherwise, keep queries close to the route or component that uses them. Use your judgment to choose the most maintainable location.

## SDK

The `./sdk` folder contains the generated `sdk.ts` file. Do not edit this directly. Run `npm run gen:graphql:sdk` to generate the file.
