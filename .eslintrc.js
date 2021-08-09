module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ['prettier', 'jest'],
  env: {
    browser: true,
    'jest/globals': true,
  },
  ignorePatterns: ['index.js'],
  rules: {
    // Allow .js files to use JSX syntax
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    // Enable perttier rules
    'prettier/prettier': 'error',
    // Disabled prefer default export
    'import/prefer-default-export': 'off',
    'import/no-unresolved': ['error', { ignore: ['^react$'] }],
  },
}
