module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'import' , 'prettier', 'jest'],
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  env: {
    'jest/globals': true
  },
  settings: {
    'import/resolver': {
        typescript: {}
      }
    },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/prefer-default-export': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'solax-*/**',
            group: 'external',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'unknown'],
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
