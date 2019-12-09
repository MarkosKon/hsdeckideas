/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
module.exports = (on, config) => {
  on('task', require('@cypress/code-coverage/task'));
  // on('file:preprocessor', require('@cypress/code-coverage/use-browserify-istanbul'));
  // on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
};
