const esbuild = require('esbuild');
const glob = require('glob');
const fs = require('fs');
const obfuscator = require('javascript-obfuscator');

const isWatch = process.argv.includes('--watch');
const isObfuscate = process.argv.includes('--obfuscate');


async function build(entryPattern, outdir, label) {
	const entryPoints = glob.sync(entryPattern);

	const buildOptions = {
		entryPoints,
		outdir,
		bundle: false,
		platform: 'browser',
		target: 'es2020',
		format: 'cjs',
		minify: false
	};

	if (isWatch) {
		const ctx = await esbuild.context(buildOptions);
		await ctx.watch();
		console.log(`[Watch] Watching ${label}`);
	} else {
		await esbuild.build(buildOptions);
		console.log(`[Build] Built ${label}`);

		if (isObfuscate) {
			const jsFiles = glob.sync(`${outdir}/**/*.js`);
			for (const file of jsFiles) {
				const raw = fs.readFileSync(file, 'utf8');
				const obfuscated = obfuscator.obfuscate(raw, {
					compact: true,
					controlFlowFlattening: true,
					deadCodeInjection: true,
					stringArray: true,
					stringArrayEncoding: ['rc4'],
					stringArrayThreshold: 1
				}).getObfuscatedCode();
				fs.writeFileSync(file, obfuscated);
				console.log(`[Obfuscate] ${file}`);
			}
		}
	}
}

(async () => {
	await build('src/client/**/*.ts', 'resource/client', 'client');
	await build('src/server/**/*.ts', 'resource/server', 'server');
	await build('src/shared/**/*.ts', 'resource/shared', 'shared');
})();
