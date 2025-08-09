/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { es2022: true, node: true, browser: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: [
    '@typescript-eslint',
    'import',
    'promise',
    'unicorn',
    'lit',
    'lit-a11y',
    'simple-import-sort',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:lit/recommended',
    'plugin:lit-a11y/recommended',
    'prettier',
  ],
  settings: { 'import/resolver': { node: { extensions: ['.ts', '.js'] } } },
  rules: {
    'unicorn/prefer-module': 'off', // mantenemos ESM sin forzar
    'unicorn/filename-case': 'off', // no tocar nombres actuales
    'import/no-unresolved': 'off', // lo resuelve TS
    'import/order': 'off', // usamos simple-import-sort
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  ignorePatterns: ['dist', 'node_modules'],
};
