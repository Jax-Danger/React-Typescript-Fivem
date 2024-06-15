// scripts/watchres.js

import chokidar from 'chokidar';
import { build } from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
import { clean } from 'esbuild-plugin-clean';
import { resolve } from 'path';

const buildPath = './build';
const isProduction = process.env.NODE_ENV === 'production';

const createBuildSettings = (path) => ({
  entryPoints: [`./resource/${path}/*.ts`],
  outdir: resolve(buildPath, path),
  bundle: true,
  platform: 'node',
  target: 'node16',
  minify: isProduction,
  sourcemap: false,
  plugins: [
    clean({
      patterns: [`./build/${path}/*`, `./build/${path}/assets/*.map.js`],
      cleanOnStartPatterns: ['./prepare'],
      cleanOnEndPatterns: ['./post'],
    }),
    esbuildPluginTsc({
      tsconfigPath: `./resource/${path}/tsconfig.json`,
      force: true,
    }),
  ],
  logLevel: 'info',
});

const buildServerResource = async () => {
  console.log('Building server resource');
  await build(createBuildSettings('server'));
  console.log('Server resource build complete');
};

const buildClientResource = async () => {
  console.log('Building client resource');
  await build(createBuildSettings('client'));
  console.log('Client resource build complete');
};

const watchResourceChanges = () => {
  console.log('Watching resource changes...');

  const watcher = chokidar.watch(['./resource/server/*.ts', './resource/client/*.ts'], {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

watcher.on('change', async (filePath) => {
  console.log(`File ${filePath} has been changed`);

  // Normalize the path to handle different OS path separators and Unicode normalization
  const normalizedPath = filePath.normalize('NFC'); // Use NFC or NFD as needed

  // Determine if the change is in the server or client directory
  if (normalizedPath.includes(path.normalize('/server/').normalize('NFC'))) {
    await buildServerResource();
  } else if (normalizedPath.includes(path.normalize('/client/').normalize('NFC'))) {
    await buildClientResource();
  } else {
    console.log('Skipping build for unknown resource');
  }
});
watchResourceChanges();
