module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true
  },
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react'
  ],
  plugins: ['flowtype'],
  settings: {
    'import/resolver': {
      'babel-module': {},
      reactnative: {}
    }
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true }
    ],
    'flowtype/require-valid-file-annotation': ['error', 'always'],
    'react/jsx-no-bind': [
      'error',
      { allowArrowFunctions: false, allowBind: false, ignoreRefs: true }
    ],
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'state',
          'constructor',
          'lifecycle',
          'everything-else',
          'render'
        ]
      }
    ]
  }
};
