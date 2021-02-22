const serveConfig = require('./serve.config');
const buildConfig = require('./build.config');

function prepareConfig({ command, mode }) {
  if (command === "serve") {
    return serveConfig;
  } else {
    return buildConfig;
  }
};

module.exports = prepareConfig;