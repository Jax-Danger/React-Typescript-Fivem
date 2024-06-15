// scripts/dev.js

const { exec } = require('child_process');
const path = require('path');
const httpServer = require('http-server');

// Start the HTTP server
const server = httpServer.createServer();
const port = 8080;

server.listen(port, () => {
  console.log(`HTTP Server running at http://localhost:${port}`);
});

// Watch for file changes and restart the server
const buildCommand = 'cd web && yarn build --watch';
const watcher = exec(buildCommand);

watcher.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

watcher.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

watcher.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
