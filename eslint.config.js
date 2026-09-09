import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importX from 'eslint-plugin-import-x'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * Fronteiras de arquitetura (ver docs/architecture.md):
 * screen/component -> hook -> service -> supabase
 * Só a camada `src/services/` pode falar com o Supabase.
 */
const supabaseClientPattern = {
  group: ['**/services/supabase', '@supabase/supabase-js'],
  message:
    'Só a camada src/services/ pode importar o cliente do Supabase. Crie/usar um service.',
  allowTypeImports: true,
}

const dataServicePattern = {
  group: ['**/services/*.service', '!**/services/auth.service'],
  message:
    'Telas e componentes acessam dados via hooks (src/hooks/), não services diretamente.',
  allowTypeImports: true,
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'import-x': importX,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: true,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        { patterns: [supabaseClientPattern] },
      ],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['src/screens/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        { patterns: [supabaseClientPattern, dataServicePattern] },
      ],
    },
  },
  {
    files: ['src/services/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': 'off',
    },
  },
])
