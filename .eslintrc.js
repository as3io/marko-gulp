module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'import'
  ],
  rules: {
    'no-underscore-dangle': [ 'error', { allow: ['_id'] } ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.marko'],
      },
    },
  },
};
