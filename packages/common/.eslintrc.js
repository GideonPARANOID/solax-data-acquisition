const parent = require('../../.eslintrc');

module.exports = Object.assign(parent, {
  extends: parent.extends.concat(['plugin:react/recommended']),
  env: Object.assign(parent.env, { browser: true }),
});
