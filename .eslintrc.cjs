/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'check-file'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
    jest: {
      version: 'latest'
    }
  },
  globals: {
    runtime: 'readonly',
    server: 'readonly'
  },
  ignorePatterns: ['/*', '!**/src', '**/node_modules', '**/dist'],
  rules: {
    camelcase: 'off',
    'no-console': 'error',
    'operator-linebreak': ['error', 'after', {
      overrides: {
        '?': 'before',
        ':': 'before',
        '|>': 'before'
      }
    }],
    'func-style': ['error', 'expression', {
      allowArrowFunctions: true
    }],
    'arrow-body-style': ['error', 'as-needed'],
    'no-duplicate-imports': ['error', {
      includeExports: true
    }],
    'padding-line-between-statements': ['error', {
      blankLine: 'always',
      prev: '*',
      next: 'return'
    }],

    '@typescript-eslint/no-use-before-define': ['error', {
      functions: false,
      classes: false,
      variables: false
    }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      ignoreRestSiblings: true
    }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'import/no-default-export': 'error',
    'import/exports-last': 'off',
    'import/group-exports': 'off',

    'check-file/folder-naming-convention': [
      'error',
      {
        'src/**/!(__tests__)': 'KEBAB_CASE',
        '__tests__/**': 'KEBAB_CASE'
      }
    ],
    'check-file/filename-naming-convention': [
      'warn',
      {
        'src/**/*.{js,ts}': 'KEBAB_CASE',
        'src/**/!(__tests__)/*.{jsx,tsx}': 'PASCAL_CASE'
      },
      {
        ignoreMiddleExtensions: true
      }
    ],

    'jest/consistent-test-it': "off",

    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: ['plugin:deprecation/recommended'],
      rules: {
        'deprecation/deprecation': 'warn',
      },
    },
    {
      files: ['src/core/products/**/api/**', 'src/core/products/types/**', 'src/core/products/**/__tests__/**'],
      rules: {
        'check-file/filename-naming-convention': [
          'warn',
          {
            '*.{js,ts}': 'PASCAL_CASE'
          },
          {
            ignoreMiddleExtensions: true
          }
        ]
      }
    },
    {
      files: ['src/core/products/kesl/**'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error'
      }
    },
    {
      files: ['src/core/products/**/__tests__/**'],
      rules: {
        'check-file/folder-naming-convention': 'off'
      }
    },
    {
      files: ['**/*.{js,jsx}'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        browser: true,
        es2020: true,
      },
      rules: {
        'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-var-requires': 'warn',
        'no-undef': 'warn',
        'no-undef': 'warn',
        'no-console': 'warn',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'deprecation/deprecation': 'off',
      },
    }
  ]
}