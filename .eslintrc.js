const ERROR = 'error'
const WARN = 'warn'
const OFF = 'off'

const tsFiles = '**/*.{ts,tsx}'
const jsFiles = '**/*.{js, jsx}'
const typeDefinitionFiles = '**/*.d.ts'
const testFiles = [
  '**/__tests__/**/*.[jt]s?(x)',
  '**/?(*.)+(spec|test).[jt]s?(x)',
]

module.exports = {
  parser: '@typescript-eslint/parser',

  plugins: [
    'babel',
    '@typescript-eslint',
    'eslint-comments',
    'react',
    'react-native',
    'jest',
  ],

  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  extends: [
    'kentcdodds/possible-errors',
    'kentcdodds/best-practices',
    'kentcdodds/react',
    'plugin:eslint-comments/recommended',
    'prettier',
    'prettier/babel',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],

  // Rules described here will overwrite rules extended above
  // meaning do not add rules that will conflict with prettier :D
  // https://github.com/prettier/eslint-config-prettier
  rules: {
    // General
    // mostly turning off conflicting rules covered elsewhere
    complexity: OFF,
    'consistent-return': OFF, // I don't think this rule is as valuable
    'no-array-constructor': WARN, // disallow use of the Array constructor
    'no-console': [
      ERROR,
      { allow: ['info', 'warn', 'error', 'ignoredYellowBox'] },
    ],
    'no-const-assign': ERROR, // disallow assignment to const-declared variables
    'no-dupe-class-members': ERROR, // disallow duplicate name in class members
    'no-dupe-keys': ERROR, // disallow duplicate keys when creating object literals
    'no-invalid-this': OFF, // disabled in favor of the babel version
    'no-new-object': WARN, // disallow use of the Object constructor
    'no-unused-expressions': OFF, // disabled in favor of the babel version
    'prefer-const': ERROR,
    'valid-jsdoc': OFF, // we have jsdoc like comments everywhere, it might take some work to get them to conform. if we even care
    'valid-typeof': OFF, // disabled in favor of the babel version

    // ESLint Comments Plugin
    // The following rules are made available via `eslint-plugin-eslint-comments`
    'eslint-comments/disable-enable-pair': [WARN, { allowWholeFile: true }],
    'eslint-comments/no-aggregating-enable': WARN, // disallows eslint-enable comments for multiple eslint-disable comments
    'eslint-comments/no-unlimited-disable': WARN, // disallows eslint-disable comments without rule names
    'eslint-comments/no-unused-disable': WARN, // disallow disables that don't cover any errors
    'eslint-comments/no-unused-enable': WARN, // // disallow enables that don't enable anything or enable rules that weren't disabled

    // ESLint Babel Plugin
    // The following rules are made available via `eslint-plugin-babel`
    'babel/no-unused-expressions': [
      ERROR,
      { allowShortCircuit: true, allowTernary: true },
    ],
    'babel/valid-typeof': ERROR,
    'babel/no-invalid-this': ERROR,

    // React Plugin
    // The following rules are made available via `eslint-plugin-react`.
    'react/jsx-boolean-value': ERROR,
    'react/jsx-filename-extension': [WARN, { extensions: ['.jsx', '.tsx'] }],
    'react/no-did-mount-set-state': OFF, // https://github.com/yannickcr/eslint-plugin-react/issues/1754

    // React Native Plugin
    // The following rules are made available via `eslint-plugin-react-native`.
    'react-native/no-unused-styles': ERROR,
    // Useful rule with a bug in it currently. It fails on new lines. Waiting for PR to merge
    // 'react-native/no-raw-text': ERROR, // https://github.com/Intellicode/eslint-plugin-react-native/issues/210, https://github.com/Intellicode/eslint-plugin-react-native/pull/220
  },

  overrides: [
    /**
     * There is no way currently to just `extends` in these overrides. It's being discussed 🤞🏻
     * https://github.com/eslint/eslint/issues/8813
     * https://github.com/eslint/rfcs/pull/9
     *
     * For now just applying those rules and config manually
     */
    {
      /* Typescript */
      files: [tsFiles, typeDefinitionFiles],
      ...require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json'),
      rules: {
        'no-unused-vars': OFF,
        ...require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json')
          .rules,
        ...require('eslint-config-prettier').rules,
        ...require('eslint-config-prettier/babel').rules,
        ...require('eslint-config-prettier/@typescript-eslint').rules,
        ...require('eslint-config-prettier/react').rules,

        '@typescript-eslint/no-unused-vars': [
          WARN,
          { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-use-before-define': [
          ERROR,
          { functions: false },
        ],
        '@typescript-eslint/explicit-member-accessibility': OFF,
      },
    },
    {
      /* Tests */
      files: [...testFiles],
      rules: {
        // Jest Plugin
        // The following rules are made available via `eslint-plugin-jest`.

        'jest/no-disabled-tests': WARN,
        'jest/no-focused-tests': ERROR,
        'jest/no-identical-title': ERROR,
        'jest/valid-expect': ERROR,
        'jest/no-alias-methods': OFF,
        'jest/no-jest-import': ERROR,
        'jest/no-large-snapshots': [WARN, { maxSize: 300 }],
        'jest/no-test-prefixes': ERROR,
        'jest/prefer-to-contain': WARN,
        'jest/prefer-to-have-length': WARN,
        'jest/valid-describe': ERROR,
        'jest/valid-expect-in-promise': ERROR,
        'jest/consistent-test-it': OFF,
        'jest/lowercase-name': OFF,
        'jest/no-hooks': OFF,
        'jest/no-jasmine-globals': OFF,
        'jest/no-test-callback': OFF,
        'jest/prefer-expect-assertions': OFF,
        'jest/prefer-to-be-null': OFF,
        'jest/prefer-to-be-undefined': OFF,
        'jest/require-tothrow-message': OFF,
        'jest/expect-expect': OFF,
        'jest/no-test-return-statement': OFF,
        'jest/prefer-inline-snapshots': OFF,
        'jest/prefer-strict-equal': OFF,
        'jest/prefer-spy-on': OFF,
        // Can be turned on after upgrade to jest 24+
        // 'jest/prefer-todo': WARN,
        'jest/no-truthy-falsy': OFF,
      },
    },
  ],

  env: {
    es6: true,
    node: true,
    'react-native/react-native': true,
    jest: true,
  },
}
