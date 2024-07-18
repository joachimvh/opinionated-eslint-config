# Opinionated eslint config

A custom eslint configuration which has strong opinions.
Because of this, it is recommended to run eslint with the `--cache` option.
Besides that I also recommend the `--warnings 0` option.

Makes use of [@antfu/eslint-config](https://github.com/antfu/eslint-config)
and [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest).


## How to use

Install with `npm i -D opinionated-eslint-config`.

Create an `eslint.config.js` file in the root of your project with the following content:

```js
const opinionated = require('opinionated-eslint-config');

module.exports = opinionated({
  typescript: {
    tsconfigPath: [ './tsconfig.json' ],
  },
});
```

The argument of the functions gets passed along to the `@antfu/eslint-config`,
so see the documentation there for extra options.

To add or modify rules, you can make use of functions such as `append` and `override`,
as described [here](https://jsr.io/@antfu/eslint-flat-config-utils/doc/~/composer).
