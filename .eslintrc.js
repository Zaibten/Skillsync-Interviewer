/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    curly: ["warn", "all"],
    "newline-before-return": "warn",
    "no-restricted-exports": [
      "warn",
      {
        restrictDefaultExports: {
          direct: false,
          named: true,
          defaultFrom: true,
          namedFrom: true,
          namespaceFrom: true,
        },
      },
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        noSortAlphabetically: true,
        shorthandLast: true,
        callbacksLast: true,
      },
    ],
    "react/no-array-index-key": "warn",
    "react/no-danger": "warn",
    "react/self-closing-comp": "warn",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "jsx-a11y/alt-text": "warn",
    "import/no-extraneous-dependencies": [
      "error",
      {
        packageDir: __dirname,
      },
    ],
  },
};
