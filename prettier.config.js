/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: 'always',
  endOfLine: 'lf',
  parser: 'typescript',
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
};
