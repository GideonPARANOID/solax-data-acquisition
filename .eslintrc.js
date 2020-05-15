module.exports =
{
  "parser": "@typescript-eslint/parser",
  "env": {
  },
  "extends": [
    "airbnb-base",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  "plugins": [ "@typescript-eslint", "import" , "prettier"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 0,
    "prefer-destructuring": 0,
    "no-return-assign": 0,
    "no-param-reassign": ["error", { "props": false } ],
    "max-len": 1
  }
};
