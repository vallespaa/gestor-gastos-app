import expoConfig from 'eslint-config-expo/flat.js';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist/*', 'node_modules/*', 'android/*', 'ios/*'],
  },
  ...expoConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          tabWidth: 2,
          semi: true,
          printWidth: 80,
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  },
];
