// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import deMorgan from 'eslint-plugin-de-morgan';
import perfectionist from 'eslint-plugin-perfectionist';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const perfectionistRecommended =
  perfectionist.configs?.['recommended-natural'] ?? {};
const deMorganRecommended = deMorgan.configs?.recommended ?? {};
const unicornRecommended =
  unicorn.configs?.['flat/recommended'] ?? unicorn.configs?.recommended ?? {};
const sonarjsRecommended = sonarjs.configs?.recommended ?? {};

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'webpack.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  perfectionistRecommended,
  deMorganRecommended,
  unicornRecommended,
  sonarjsRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      'sonarjs/no-empty-function': 'off',
      'sonarjs/no-unused-expressions': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
