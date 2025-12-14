const config = {
  singleQuote: true,
  printWidth: 100,
  endOfLine: 'auto',
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cx'],
  importOrder: ['^react', '<THIRD_PARTY_MODULES>', '^[./]'],
};

export default config;
