const { build, context } = require('esbuild');
const { sync: glob } = require('glob');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const obfuscate = require('javascript-obfuscator');

// Load or initialize build.config.json
const configPath = path.resolve(__dirname, 'build.config.json');
if (!fs.existsSync(configPath)) {
	const defaultPath = path.resolve(__dirname, '../resources/[test]');
	fs.mkdirSync(defaultPath, { recursive: true });
	fs.writeFileSync(configPath, JSON.stringify({ resourcesPath: defaultPath }, null, 2));
	console.log(`✅ Created build.config.json with resourcesPath: ${defaultPath}`);
}
const config = require('./build.config.json');
const fivemResourcesPath = config.resourcesPath;

// CLI flags
const isWatch = process.argv.includes('--watch');
const isObf = process.argv.includes('--obfuscate');
const args = process.argv.filter(arg => !arg.startsWith('--'));
const folderArg = args[2];

// Locate all resources under packages/
const root = path.resolve(__dirname, 'packages');
if (!fs.existsSync(root)) fs.mkdirSync(root);
const allResources = fs
	.readdirSync(root)
	.filter(name => fs.existsSync(path.join(root, name, 'src')));
const resources = folderArg ? [folderArg] : allResources;
const targets = ['client', 'server', 'shared'];


async function buildFolder() {
	const resList = resources;

	for (const name of resList) {
		const base = path.join(root, name);
		const src = path.join(base, 'src');
		const outDir = path.join(fivemResourcesPath, name);

		// ensure resource root only
		fs.mkdirSync(outDir, { recursive: true });

		// build client/server/shared separately
		for (const slice of ['client', 'server', 'shared']) {
			const sliceSrc = path.join(src, slice);
			const files = glob(`${sliceSrc}/**/*.ts`.replace(/\\/g, '/'));
			if (!files.length) {
				console.log(`[Skip] ${name}/${slice} has no .ts files`);
				continue;
			}

			// temporary entry
			const entry = path.join(sliceSrc, `__${slice}_main.ts`);
			const imports = files.map(f => {
				const rel = './' + path
					.relative(sliceSrc, f)
					.replace(/\\/g, '/')
					.replace(/\.ts$/, '');
				return `import '${rel}';`;
			}).join('\n');
			fs.writeFileSync(entry, imports);

			// output folder
			const sliceOut = path.join(outDir, slice);
			fs.mkdirSync(sliceOut, { recursive: true });
			const outFile = path.join(sliceOut, `${slice}.js`);

			// bundle
			const opts = {
				entryPoints: [entry],
				outfile: outFile,
				bundle: true,
				platform: 'node',
				target: 'es2020',
				format: 'iife',
				minify: false,
				sourcemap: false,
			};

			if (isWatch) {
				const ctx = await context(opts);
				await ctx.watch();
				console.log(`[Watch] ${name}/${slice}.js`);
			} else {
				await build(opts);
				console.log(`[Build] ${name}/${slice}.js`);
				if (isObf) {
					const code = fs.readFileSync(outFile, 'utf8');
					const obf = obfuscate.obfuscate(code, {
						compact: true,
						controlFlowFlattening: true,
						deadCodeInjection: true,
						stringArray: true,
						stringArrayEncoding: ['rc4'],
						stringArrayThreshold: 1
					}).getObfuscatedCode();
					fs.writeFileSync(outFile, obf);
					console.log(`[Obfuscate] ${name}/${slice}.js`);
				}
				fs.unlinkSync(entry);
			}
		}

		// build config.ts into config.js at resource root
		const configTs = path.join(src, 'config.ts');
		const configJs = path.join(outDir, 'config.js');
		if (fs.existsSync(configTs)) {
			await build({
				entryPoints: [configTs],
				outfile: configJs,
				bundle: true,
				platform: 'node',
				format: 'iife',
				minify: false,
			});
			console.log(`[Build] ${name}/config.js`);
		}

		// copy fxmanifest.lua
		const manifestSrc = path.join(base, 'fxmanifest.lua');
		const manifestDest = path.join(outDir, 'fxmanifest.lua');
		if (fs.existsSync(manifestSrc)) {
			fs.copyFileSync(manifestSrc, manifestDest);
			console.log(`[Manifest] Copied fxmanifest.lua for ${name}`);
		} else {
			console.log(`[Skip] ${name} missing fxmanifest`);
		}
	}
}

(async () => {
	await buildFolder();
	if (isWatch) {
		console.log('\n👀 Watch mode active — waiting for changes...');
		const watchPaths = resources.map(name => path.join(root, name, 'src'));
		chokidar.watch(watchPaths, {
			ignored: /(^|[\/\\])\../,
			ignoreInitial: true,
			persistent: true
		}).on('all', async (event, filePath) => {
			if (!filePath.endsWith('.ts')) return;
			const relative = path.relative(root, filePath);
			const parts = relative.split(path.sep);
			if (parts.length < 3) return;
			const [resourceName, slice] = parts;
			if (!targets.includes(slice)) return;
			console.log(`[Watch] Changed: ${filePath} → Rebuilding ${resourceName}/${slice}`);
			await buildFolder(slice, [resourceName]);
		});
		await new Promise(() => { });
	}
})();
