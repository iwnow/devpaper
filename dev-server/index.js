const { createServer } = require('vite');
const path = require('path');

;(async () => {
  const server = await createServer({
    configFile: path.resolve(__dirname, './vite.config.js'),
    server: {
      port: 1337
    }
  })
  await server.listen()
})()
