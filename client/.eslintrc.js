module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ["import"],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"],
        ],
        extensions: [".vue", ".json", ".js"],
      },
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: 'off',
    'import/prefer-default-export': 'off',
    quotes: 'off',
    'consistent-return': 'off',
    'object-shorthand': 'off',
    'prefer-destructuring': 'off',
    eqeqeq: 'off',
    'no-underscore-dangle': ["warn", { allow: ["_id"] }],
    // '@vue/airbnb/no-underscore-dangle': "off",
    // '@babel-eslint/no-underscore-dangle': "off",

  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      rules: {
        // '@vue/airbnb/no-underscore-dangle': "off",
        // '@babel-eslint/no-underscore-dangle': "off",
      'no-underscore-dangle': ["warn", { allow: ["_id"] }],

      },
      env: {
        jest: true,
      },
    },
  ],
};
