const path = require('path');

/**
 * @type {import('vite').UserConfig}
 */
const serveConfig = {
    root: path.resolve(__dirname, '../src/'),
};

module.exports = serveConfig;