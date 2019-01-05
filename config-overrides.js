const { override } = require("customize-cra");

const setGlobalObject = value => config => {
  // mutate config as you want
  config.output.globalObject = value;

  // return config so the next function in the pipeline receives it as argument
  return config;
};

module.exports = override(setGlobalObject("self"));
