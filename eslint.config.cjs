// ESLint v9 flat config
// Documentación: https://eslint.org/docs/latest/use/configure/configuration-files-new

const tsParser = require('@typescript-eslint/parser');
const ts = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const promise = require('eslint-plugin-promise');
const unicorn = require('eslint-plugin-unicorn');
const lit = require('eslint-plugin-lit');
const litA11y = require('eslint-plugin-lit-a11y');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const prettierCompat = require('eslint-config-prettier');

module.exports = [
  // Ignorados (sustituye a .eslintignore)
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },

  // Reglas para TS y JS
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // entornos web y node básicos
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      import: importPlugin,
      promise,
      unicorn,
      lit,
      'lit-a11y': litA11y,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Proyecto
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Unicorn (aligeradas para no pelearse con el repo actual)
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': 'off',

      // Import (dejamos a TS/Vite resolver paths)
      'import/no-unresolved': 'off',

      // TS (reglas base sin ser intrusivas)
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // Compatibilidad con Prettier (desactiva reglas de estilo en conflicto)
  prettierCompat,
];
