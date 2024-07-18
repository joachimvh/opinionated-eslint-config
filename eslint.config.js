const opinionated = require('./dist');

module.exports = opinionated({
  typescript: {
    tsconfigPath: [ './tsconfig.json' ],
  },
}).override('opinionated/typed', {
  rules: {
    // All rule definitions break this
    'ts/naming-convention': 'off',
  },
});
