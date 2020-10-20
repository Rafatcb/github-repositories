module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        'no-unused-vars': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'react', 'react-native'],
  rules: {
    // Possible errors
    // These rules relate to possible syntax or logic errors in JavaScript code

    'no-console': 'error', // disallow the use of `console`
    'no-else-return': 'warn', // disallow `else` blocks after `return` statements in `if` statements
    'no-empty-function': 'warn', // disallow empty functions
    'no-extra-parens': ['warn', 'all', { ignoreJSX: 'multi-line' }], // disallow unnecessary parentheses
    'no-invalid-this': 'warn', // disallow `this` keywords outside of classes or class-like objects
    'no-loop-func': 'warn', // disallow function declarations that contain unsafe references inside loop statements
    'no-magic-numbers': 'warn', // disallow magic numbers
    'no-param-reassign': 'warn', // disallow reassigning `function` parameters
    'no-return-await': 'warn', // disallow unnecessary `return await`
    'no-throw-literal': 'warn', // disallow throwing literals as exceptions
    'no-unmodified-loop-condition': 'warn', // disallow unmodified loop conditions
    'no-useless-concat': 'warn', // disallow unnecessary concatenation of literals or template literals
    'no-useless-return': 'warn', // disallow redundant return statements

    // Best practices
    // These rules relate to better ways of doing things to help you avoid problems

    'array-callback-return': 'warn', // enforce `return` statements in callbacks of array methods
    'block-scoped-var': 'error', // enforce the use of variables within the scope they are defined
    'default-case-last': 'warn', // enforce default clauses in switch statements to be last
    'default-param-last': 'warn', // enforce default parameters to be last
    'dot-location': ['warn', 'property'], // enforce consistent newlines before and after dots
    'guard-for-in': 'error', // require `for-in` loops to include an `if` statement

    // Stylistic issues
    // These rules relate to style guidelines, and are therefore quite subjective

    'no-nested-ternary': 'warn', // disallow nested ternary expressions
    'no-unneeded-ternary': 'warn', // disallow ternary operators when simpler alternatives exist

    // EcmaScript 6
    // These rules relate to ES6, also known as ES2015

    'no-duplicate-imports': 'warn', // disallow duplicate module imports
    'no-useless-constructor': 'warn', // disallow unnecessary constructors
    'no-useless-rename': 'warn', // disallow renaming import, export, and destructured assignments to the same name
    'prefer-const': 'warn', // require `const` declarations for variables that are never reassigned after declared

    // Jest plugin `eslint-plugin-jest`

    'jest/lowercase-name': ['warn', { ignore: ['describe'] }], // enforce lowercase test names
    'jest/no-duplicate-hooks': 'error', // disallow duplicate setup and teardown hooks
    'jest/require-top-level-describe': 'error', // require test cases and hooks to be inside a `describe` block

    // React plugin `eslint-plugin-react`

    'react/jsx-boolean-value': 'warn', // enforce boolean attributes notation in JSX
    'react/jsx-fragments': ['warn', 'syntax'], // enforce shorthand or standard form for React fragments
    'react/jsx-no-bind': 'warn', // prevents usage of Function.prototype.bind and arrow functions in React component props
    'react/jsx-no-useless-fragment': 'warn', // disallow unnecessary fragments
    'react/jsx-pascal-case': ['warn', { allowAllCaps: false }], // enforce PascalCase for user-defined JSX components
    'react/jsx-sort-props': 'warn', // enforce props alphabetical sorting
    'react/no-this-in-sfc': 'warn', // report `this` being used in stateless components

    // React Native plugin `eslint-plugin-react-native`

    'react-native/no-raw-text': 'error', // detect raw text outside of `Text` component
    'react-native/no-single-element-style-arrays': 'warn', // no style arrays that have 1 element only
    'react-native/no-color-literals': 'error', // detect `StyleSheet` rules and inline styles containing color literals instead of variables
    'react-native/no-unused-styles': 'error', // detect `StyleSheet` rules which are not used in your React components
  },
};
