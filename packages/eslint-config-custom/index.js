module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    ignorePatterns: ['.eslintrc.js', '.eslintrc.cjs'],
    env: {
        node: true,
        jest: true,
      },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': ['error', { doubleQuote: false, singleQuote: true, tabWidth: 4, trailingComma: 'all' }],
    },
};