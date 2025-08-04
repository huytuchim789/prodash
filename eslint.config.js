import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-spread': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', '*.config.js', '*.config.cjs', '*.config.mjs'],
  },
);
