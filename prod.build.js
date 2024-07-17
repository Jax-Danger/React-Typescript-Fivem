import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { build } from 'esbuild';

const buildPath = resolve('build');

build({
	entryPoints: [
		'./resource/client/*.ts',
		'./resource/server/*.ts',
		'./resource/shared/*.ts',
	],
	outdir: resolve(buildPath),
	bundle: true,
	minify: true,
	platform: 'browser',
	target: 'es2020',
	logLevel: 'info',
}).catch(() => process.exit(1));

export const buildResource = async () => {
	console.log("Building resource & UI...\n Shouldn't take long.");
	// Build for server
	// Vite build
	const cwd = resolve('./web');
	console.log(`Building UI in ${cwd}`);
	const result = spawnSync('yarn', ['build'], { cwd: cwd, shell: true });
	console.log(result.stdout.toString());
};

buildResource().catch((error) => {
	console.error(error);
	process.exit(1);
});
