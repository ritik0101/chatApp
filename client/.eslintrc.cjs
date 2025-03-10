module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': 0,
      'react/no-unescaped-entities': 0,
      'react/prop-types': 0,
      'react-hooks/exhaustive-deps': 0,
      'react-hooks/rules-of-hooks' : 0,
      'react/jsx-key' : 0,
      'react/jsx-no-undef': 0
    },
  }
  