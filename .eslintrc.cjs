module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-redux/recommended',
  ],
  settings: {
    "react": {
      "version": "detect"
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-redux', 'redux-saga', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/strict-boolean-expressions": 0,
    "react-hooks/exhaustive-deps": 0,
    "react-refresh/only-export-components": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react-redux/useSelector-prefer-selectors": 0,
    "prefer-regex-literals": 0
  },
  ignorePatterns: ['vite-env.d.ts', 'vite.config.ts', 'backend/', '.eslintrc.cjs']
}
