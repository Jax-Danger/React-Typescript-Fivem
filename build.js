const esbuild = require('esbuild');
const glob = require('glob');
const path = require('path');

const isWatch = process.argv.includes('--watch');

async function build(entryPattern, outdir, label) {
	const entryPoints = glob.sync(entryPattern);

	const buildOptions = {
		entryPoints,
		outdir,
		bundle: true,
		platform: 'browser',
		target: 'es2020',
		format: 'cjs',
		minify: true
	};

	if (isWatch) {
		const ctx = await esbuild.context(buildOptions);
		await ctx.watch();
		console.log(`[Watch] Watching ${label}`);
	} else {
		await esbuild.build(buildOptions);
		console.log(`[Build] Built ${label}`);
	}
}

(async () => {
	await build('src/client/**/*.ts', 'resource/client', 'client');
	await build('src/server/**/*.ts', 'resource/server', 'server');
})();
