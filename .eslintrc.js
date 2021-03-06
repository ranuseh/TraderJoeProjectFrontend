module.exports = {
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
plugins: ['react', 'prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  rules: {
    "no-shadow": "error",
    "no-param-reassign": "error",
    //Stylistic Issues
    "no-trailing-spaces": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*"
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"]
      }
    ],
    quotes: ["error", "single"],
    // "quote-props": ["error", "consistent-as-needed"],
    //ECMAScript 6
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    //React
    "react/prop-types": "off",
    "react/display-name": "off",
    //Prettier
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all"
      }
    ],
    //Typescript
    "@typescript-eslint/explicit-function-return-type": "off", 
    "@typescript-eslint/no-use-before-define": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
