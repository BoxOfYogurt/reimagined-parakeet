import dotenvx from '@dotenvx/dotenvx';
import type { CodegenConfig } from '@graphql-codegen/cli';

dotenvx.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.CONTENTFUL_GRAPHQL_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  documents: ['./src/**/*.fragment.graphql', './src/**/*.query.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/sdk/sdk.ts': {
      plugins: ['typescript', 'typescript-graphql-request', 'typescript-operations'],
      config: {
        rawRequest: true,
        internalFragments: true,
        useTypeImports: true,
        dedupeFragments: true,
        enumsAsTypes: true,
        nonOptionalTypename: false,
        skipTypeNameForRoot: true,
        extensionsType: 'unknown',
        scalars: {
          Bool: 'boolean',
        },
      },
    },
  },
};

export default config;
