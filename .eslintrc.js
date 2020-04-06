module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    "plugin:react/recommended",
    'prettier',
    'prettier/react'
  ],
  parserOptions:  {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures:  {
      jsx: true
    },
  },
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    'import',
    'sort-imports-es6-autofix'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        singleQuote: true,
        semi: true
      }
    ],

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],

    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none']
      }
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    },
  }
};
