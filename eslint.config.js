import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import effector from 'eslint-plugin-effector';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

import globals from 'globals';

export default defineConfig([
  globalIgnores([
    'dist',
    '.yarn',
    'node_modules',
    'commitlint.config.js',
    'eslint.config.js',
    'postcss.config.js',
    'stylelint.config.mjs',
    'vite.config.ts',
  ]),
  {
    ...effector.flatConfigs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.app.json',
        parser: tsParser,
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/*.css.d.ts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^node:'],
            ['eslint'],
            ['vite', 'plugin'],
            ['react'],
            ['react-hook-form', '@hookform'],
            ['effector', '@tabler', 'atomic-router'],
            ['^@?\\w'],
            ['@specialized-messenger/api'],
            ['^@/shared'],
            ['^@/entities'],
            ['^@/features'],
            ['^@/widgets'],
            ['^@/layouts'],
            ['^@/pages'],
            ['^@/app'],
            ['^@/'],
            ['^\\.'],
            ['.css'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  eslintConfigPrettier,
]);
