module.exports = {
  env: {
    browser: true,
  },

  extends: ['@jiepeng/eslint-config-jiepeng-react'],

  rules: {
    'react/prop-types': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/jsx-key': 2,
    'react/forbid-prop-types': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/no-extraneous-dependencies': 'warn',
  },
};
