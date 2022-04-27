module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2020,

    sourceType: 'module',
  },

  extends: ['plugin:@typescript-eslint/recommended'],

  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
