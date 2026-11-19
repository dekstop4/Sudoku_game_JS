import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      indent: ['error', 2],
      semi: ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      '@typescript-eslint/no-explicit-any': 'error'
    }
  }
)
