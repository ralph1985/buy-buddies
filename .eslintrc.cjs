/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { es2022: true, node: true, browser: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'promise',
    'unicorn',
    'lit',
    'lit-a11y',
    'simple-import-sort'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:lit/recommended',
    'plugin:lit-a11y/recommended',
    // ¡siempre al final!
    'eslint-config-prettier'
  ],
  settings: {
    'import/resolver': { node: { extensions: ['.ts', '.js'] } }
  },
  rules: {
    // Proyecto
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',

    // Unicorn
    'unicorn/prefer-module': 'off',
    'unicorn/filename-case': 'off',

    // Import
    'import/no-unresolved': 'off',

    // TS
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  ignorePatterns: ['dist', 'node_modules', 'coverage']
};
