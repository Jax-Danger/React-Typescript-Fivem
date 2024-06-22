// scripts/dev.js

import { exec } from "child_process";
import { createServer } from "http-server";
import chokidar from "chokidar";
import { buildResource } from "./build.js"; // Assuming build.js is in the same directory

// Start the HTTP server
const server = createServer();
const port = 8080;

server.listen(port, () => {
  console.log(`HTTP Server running at http://localhost:${port}`);
});

// Function to run the build and log output
const runBuild = async () => {
  try {
    await buildResource();
    console.log("Build complete");
  } catch (error) {
    console.error("Build failed", error);
  }
};

// Initial build

// Watch for file changes and trigger build
const watcher = chokidar.watch("./resource", {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

watcher.on("change", (path) => {
  console.log(`File ${path} has been changed`);
  runBuild();
});

// Watch for changes in the web directory and trigger yarn build
const webWatcher = chokidar.watch("./web", {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

webWatcher.on("change", (path) => {
  console.log(`File ${path} in web has been changed`);
  exec("cd web && yarn build", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Web build output: ${stdout}`);
  });
});
