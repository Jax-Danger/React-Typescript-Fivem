import { spawnSync } from "child_process";
import { build } from "esbuild";
import { Rcon } from "rcon-client";
import { resolve } from 'path';



export const buildResource = async () => {
  console.log("Building resource & UI...\n Shouldn't take long.");
  // Build for server
  build({
    bundle: true,
    entryPoints: ['./resource/server/index.ts'],
    outfile: 'build/server.js',
    keepNames: true,
    format: 'cjs',
  })

  // Build for client
  build({
    bundle: true,
    entryPoints: ['./resource/client/index.ts'],
    outfile: 'build/client.js',
    keepNames: true,
    format: 'cjs',
  })
  // Vite build
  const cwd = resolve("./web");
  console.log(`Building UI in ${cwd}`);
  const result = spawnSync("yarn", ["build"], { cwd: cwd, shell: true });
  console.log(result.stdout.toString());
};

buildResource().catch((error) => {
  console.error(error);
  process.exit(1);
});
