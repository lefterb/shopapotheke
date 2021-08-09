module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.eslint.json"
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  rules: {
    "import/prefer-default-export": 0,
    "import/no-cycle": 0,
    "react/jsx-props-no-spreading": 0,
    "object-curly-spacing": ["off", "always"],
    "react/require-default-props": 0,
    "react/prop-types": 0,
    "prettier/prettier": 0,
    "no-console": 1,
    "@typescript-eslint/no-var-requires": 0,
    // place to specify ESLint rules - can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  }
}
