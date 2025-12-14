const config = {
  singleQuote: true,
  printWidth: 100,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
  tailwindFunctions: ['cx'],
  importOrder: ['^react', '^next', '<THIRD_PARTY_MODULES>', '^@/', '^[./]'],
};

export default config;
