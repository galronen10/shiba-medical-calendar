module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-native/all',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: ['unused-imports', 'import'],
  rules: {
    // Add any project-specific rules or overrides here
    'prettier/prettier': 1,
    'unused-imports/no-unused-imports': 'error',
    'react/jsx-filename-extension': [
      0,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 1,
    'import/extensions': ['error', 'never'],
    'import/no-extraneous-dependencies': ['error'],
    '@typescript-eslint/no-explicit-any': 1,
    'react-native/no-raw-text': 0,
    'react-native/no-color-literals': 0,
  },
};
