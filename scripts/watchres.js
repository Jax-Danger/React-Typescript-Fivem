// scripts/watchres.js

import chokidar from 'chokidar';
import { buildResource } from './build.js'; // Assuming build.js is in the same directory

const watchResourceChanges = () => {
  console.log('Watching resource changes...');
  
  const watcher = chokidar.watch('./resource', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  watcher.on('change', (path) => {
    console.log(`File ${path} has been changed`);
    buildResource().then(() => {
      console.log('Build complete');
    }).catch((error) => {
      console.error('Build failed', error);
    });
  });
};

watchResourceChanges();
