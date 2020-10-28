/* eslint-disable sort-keys */
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
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        // Supported rules
        // enforces consistent usage of type assertions
        '@typescript-eslint/consistent-type-assertions': [
          'warn',
          { assertionStyle: 'as' },
        ],
        // enforces consistent usage of type imports
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          { prefer: 'type-imports' },
        ],
        // require a consistent member declaration order
        '@typescript-eslint/member-ordering': 'warn',
        // disallow throwing literals as exceptions
        '@typescript-eslint/no-throw-literal': 'warn',
        // flags unnecessary equality comparisons against boolean literals
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
        // prefer a `for-of` loop over a standard `for` loop if the index is only used to access the array being iterated
        '@typescript-eslint/prefer-for-of': 'warn',
        // enforce the usage of the nullish coalescing operator instead of logical chaining
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        // prefer using concise optional chain expressions instead of chained logical ands
        '@typescript-eslint/prefer-optional-chain': 'error',
        // requires that private members are marked as `readonly` if they're never modified outside of the constructor
        '@typescript-eslint/prefer-readonly': 'warn',
        // prefer using type parameter when calling `Array#reduce` instead of casting
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        // enforce the use of `String#startsWith` and `String#endsWith` instead of other equivalent methods of checking substrings
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        // requires any function or method that returns a `Promise` to be marked async
        '@typescript-eslint/promise-function-async': 'warn',
        // warns for any two overloads that could be unified into one by using a union or an optional/rest parameter
        '@typescript-eslint/unified-signatures': 'warn',

        // Extension rules

        // enforce default parameters to be last
        '@typescript-eslint/default-param-last': 'error',
        // disallow duplicate imports
        '@typescript-eslint/no-duplicate-imports': 'error',
        // disallow empty functions
        '@typescript-eslint/no-empty-function': [
          'warn',
          { allow: ['private-constructors', 'protected-constructors'] },
        ],
        // disallow unnecessary parentheses
        '@typescript-eslint/no-extra-parens': [
          'warn',
          'all',
          { ignoreJSX: 'multi-line' },
        ],
        // disallow this keywords outside of classes or class-like objects
        '@typescript-eslint/no-invalid-this': 'warn',
        // disallow function declarations that contain unsafe references inside loop statements
        '@typescript-eslint/no-loop-func': 'warn',
        // disallow unused variables
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],

        'default-param-last': 'off',
        'no-duplicate-imports': 'off',
        'no-throw-literal': 'off',
        'no-empty-function': 'off',
        'no-extra-parens': 'off',
        'no-invalid-this': 'off',
        'no-loop-func': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      files: [
        '*.{spec,test}.{js,ts,tsx}',
        '**/__{mocks,tests}__/**/*.{js,ts,tsx}',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'warn',
          { devDependencies: true },
        ], // forbid the use of extraneous packages, allow devDependencies
      },
    },
  ],
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'import',
    'jest',
    'react',
    'react-native',
  ],
  rules: {
    // Possible errors
    // These rules relate to possible syntax or logic errors in JavaScript code

    'no-console': 'error', // disallow the use of `console`
    'no-else-return': 'warn', // disallow `else` blocks after `return` statements in `if` statements
    'no-empty-function': 'warn', // disallow empty functions
    'no-extra-parens': 'warn', // disallow unnecessary parentheses
    'no-invalid-this': 'warn', // disallow `this` keywords outside of classes or class-like objects
    'no-loop-func': 'warn', // disallow function declarations that contain unsafe references inside loop statements
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
    'default-param-last': 'error', // enforce default parameters to be last
    'dot-location': ['warn', 'property'], // enforce consistent newlines before and after dots
    'guard-for-in': 'error', // require `for-in` loops to include an `if` statement

    // Stylistic issues
    // These rules relate to style guidelines, and are therefore quite subjective

    'lines-between-class-members': ['warn', 'always'], // require or disallow an empty line between class members
    'no-nested-ternary': 'warn', // disallow nested ternary expressions
    'no-unneeded-ternary': 'warn', // disallow ternary operators when simpler alternatives exist
    'sort-keys': 'warn', // require object keys to be sorted

    // EcmaScript 6
    // These rules relate to ES6, also known as ES2015

    'no-duplicate-imports': 'warn', // disallow duplicate module imports
    'no-useless-constructor': 'warn', // disallow unnecessary constructors
    'no-useless-rename': 'warn', // disallow renaming import, export, and destructured assignments to the same name
    'prefer-const': 'warn', // require `const` declarations for variables that are never reassigned after declared

    // Import plugin `eslint-plugin-import`

    // Static analysis
    'import/no-absolute-path': 'error', // forbid import of modules using absolute paths
    'import/no-dynamic-require': 'warn', // forbid `require()` calls with expressions
    'import/no-useless-path-segments': 'warn', // prevent unnecessary path segments in import and require statements

    // Helpful warnings
    'import/no-extraneous-dependencies': ['error', { devDependencies: false }], // forbid the use of extraneous packages

    // Style guide
    'import/first': 'error', // ensure all imports appear before other statements
    'import/newline-after-import': 'error', // enforce a newline after import statements

    // Import Helpers plugin `eslint-plugin-import-helpers`

    // enforce a configurable convention in module import order
    'import-helpers/order-imports': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        groups: [
          '/^react(-native)?$/',
          'module',
          '//services/',
          '//contexts/',
          '//screens/',
          '//components/',
          ['parent', 'sibling', 'index'],
        ],
        newlinesBetween: 'always',
      },
    ],

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
    'react/jsx-sort-props': ['warn', { reservedFirst: true }], // enforce props alphabetical sorting
    'react/no-this-in-sfc': 'warn', // report `this` being used in stateless components
    'react/prop-types': 'off', // prevent missing props validation in a React component definition

    // React Native plugin `eslint-plugin-react-native`

    'react-native/no-raw-text': 'error', // detect raw text outside of `Text` component
    'react-native/no-single-element-style-arrays': 'warn', // no style arrays that have 1 element only
    'react-native/no-color-literals': 'error', // detect `StyleSheet` rules and inline styles containing color literals instead of variables
    'react-native/no-unused-styles': 'error', // detect `StyleSheet` rules which are not used in your React components
  },
};
