const esbuild = require('esbuild');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const obfuscator = require('javascript-obfuscator');

const isWatch = process.argv.includes('--watch');
const isObfuscate = process.argv.includes('--obfuscate');

async function buildFolder(folderName) {
	const inputDir = `${folderName}`;
	const outputFile = `../production/${folderName}/${folderName}.js`;

	// Collect all .ts files in the folder (excluding main.ts if already there)
	const files = glob.sync(`${inputDir}/**/*.ts`).filter(f => !f.endsWith('main.ts'));
	if (files.length === 0) {
		console.warn(`[Skip] No .ts files found in ${inputDir}`);
		return;
	}

	// Generate temporary main.ts that imports all files
	const tempMainPath = path.join(inputDir, 'main.ts');
	const imports = files.map(f => {
		const relative = './' + path.relative(inputDir, f).replace(/\\/g, '/').replace(/\.ts$/, '');
		return `import '${relative}';`;
	});
	fs.writeFileSync(tempMainPath, imports.join('\n'));

	const buildOptions = {
		entryPoints: [tempMainPath],
		outfile: outputFile,
		bundle: true,
		platform: 'browser',
		target: 'es2020',
		format: 'iife',
		minify: false,
		sourcemap: false
	};

	if (isWatch) {
		const ctx = await esbuild.context(buildOptions);
		await ctx.watch();
		console.log(`[Watch] Watching ${folderName}`);
	} else {
		await esbuild.build(buildOptions);
		console.log(`[Build] Built ${folderName}.js`);

		if (isObfuscate) {
			const raw = fs.readFileSync(outputFile, 'utf8');
			const obfuscated = obfuscator.obfuscate(raw, {
				compact: true,
				controlFlowFlattening: true,
				deadCodeInjection: true,
				stringArray: true,
				stringArrayEncoding: ['rc4'],
				stringArrayThreshold: 1
			}).getObfuscatedCode();
			fs.writeFileSync(outputFile, obfuscated);
			console.log(`[Obfuscate] ${outputFile}`);
		}

		// Clean up temporary main.ts
		fs.unlinkSync(tempMainPath);
	}
}

// Run for each target
(async () => {
	await buildFolder('client');
	await buildFolder('server');
	await buildFolder('shared');
})();
