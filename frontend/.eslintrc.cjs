module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'custom',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
}
