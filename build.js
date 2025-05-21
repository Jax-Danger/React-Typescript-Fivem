const { build, context } = require('esbuild');
const { sync: glob } = require('glob');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const obfuscate = require('javascript-obfuscator');

const configPath = path.resolve(__dirname, 'build.config.json');
if (!fs.existsSync(configPath)) {
	const defaultPath = path.resolve(__dirname, '../resources/[test]');
	fs.mkdirSync(defaultPath, { recursive: true });
	fs.writeFileSync(configPath, JSON.stringify({ resourcesPath: defaultPath }, null, 2));
	console.log(`✅ Created build.config.json with resourcesPath: ${defaultPath}`);
}
const config = require('./build.config.json');
const fivemResourcesPath = config.resourcesPath;

const isWatch = process.argv.includes('--watch');
const isObf = process.argv.includes('--obfuscate');
const args = process.argv.filter(arg => !arg.startsWith('--'));
const folderArg = args[2];

const root = path.resolve(__dirname, 'packages');
if (!fs.existsSync(root)) fs.mkdirSync(root);
const allResources = fs.readdirSync(root).filter(name => fs.existsSync(path.join(root, name, 'src')));
const resources = folderArg ? [folderArg] : allResources;
const targets = ['client', 'server', 'shared'];

// Postinstall script: create "editME" base resource
if (process.env.npm_lifecycle_event === 'postinstall') {
	const editMePath = path.join(root, 'editME');
	const srcPath = path.join(editMePath, 'src');
	const structure = {
		client: {
			filename: 'base.ts',
			content: `/// <reference types=\"@citizenfx/client\" />\n`
		},
		server: {
			filename: 'base.ts',
			content: `/// <reference types=\"@citizenfx/server\" />\n`
		},
		shared: {
			filename: 'base.ts',
			content: `/// <reference types=\"../../global.d.ts\" />\n`
		},
		config: {
			filename: 'config.ts',
			content: `// edit the config based on the config.d.ts file.
globalThis.config = {};
` },
		configType: {
			filename: 'config.d.ts',
			content: `interface Config {
  resourceName: string;
  enabled: boolean;
  permissions: string[];
  debugMode?: boolean;
}

declare const config: Config;
` }
	};

	if (!fs.existsSync(editMePath)) {
		fs.mkdirSync(editMePath);
		fs.mkdirSync(srcPath);
		fs.writeFileSync(path.join(editMePath, 'fxmanifest.lua'), `fx_version 'cerulean'\ngame 'gta5'\n\nclient_script 'dist/client.js'\nserver_script 'dist/server.js'\nshared_script 'dist/shared.js'\n`);

		for (const key of ['client', 'server', 'shared']) {
			const dir = path.join(srcPath, key);
			fs.mkdirSync(dir);
			fs.writeFileSync(path.join(dir, structure[key].filename), structure[key].content);
		}

		fs.writeFileSync(path.join(srcPath, structure.config.filename), structure.config.content);
		fs.writeFileSync(path.join(srcPath, structure.configType.filename), structure.configType.content);
		console.log('✅ Created base resource: packages/editME');
	}
}

async function buildFolder(target, onlyResources) {
	const resList = Array.isArray(onlyResources) ? onlyResources : resources;

	for (const name of resList) {
		const base = path.join(root, name);
		const src = path.join(base, 'src');
		const dist = path.join(base, 'dist');
		fs.mkdirSync(dist, { recursive: true });

		const files = glob(`${src}/${target}/**/*.ts`.replace(/\\/g, '/'));
		if (!files.length) {
			console.log(`[Skip] ${name}/${target} has no .ts files`);
			continue;
		}

		const entry = path.join(src, `__${target}_main.ts`);
		const out = path.join(dist, `${target}.js`);
		const imports = files.map(f => `import './${path.relative(src, f).replace(/\\/g, '/').replace(/\.ts$/, '')}';`);
		fs.writeFileSync(entry, imports.join('\n'));

		const opts = {
			entryPoints: [entry],
			outfile: out,
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
			console.log(`[Watch] ${name}/${target}.js`);
		} else {
			await build(opts);
			console.log(`[Build] ${name}/${target}.js`);

			if (isObf) {
				const code = fs.readFileSync(out, 'utf8');
				const obf = obfuscate.obfuscate(code, {
					compact: true,
					controlFlowFlattening: true,
					deadCodeInjection: true,
					stringArray: true,
					stringArrayEncoding: ['rc4'],
					stringArrayThreshold: 1,
				}).getObfuscatedCode();
				fs.writeFileSync(out, obf);
				console.log(`[Obfuscate] ${name}/${target}.js`);
			}
		}

		if (!isWatch) fs.unlinkSync(entry);

		const configTs = path.join(src, 'config.ts');
		const configJs = path.join(dist, 'config.js');
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

		const resourceOut = path.join(fivemResourcesPath, name);
		const distDir = path.join(base, 'dist');
		const manifestSrc = path.join(base, 'fxmanifest.lua');

		if (!fs.existsSync(manifestSrc)) {
			console.log(`[Skip] ${name} missing fxmanifest`);
			continue;
		}

		if (fs.existsSync(resourceOut)) fs.rmSync(resourceOut, { recursive: true });
		fs.mkdirSync(resourceOut, { recursive: true });

		const distFiles = fs.readdirSync(distDir);
		for (const file of distFiles) {
			const src = path.join(distDir, file);
			const dest = path.join(resourceOut, file);
			try {
				if (fs.existsSync(dest)) {
					const stat = fs.lstatSync(dest);
					if (stat.isSymbolicLink() || stat.isFile()) {
						fs.unlinkSync(dest);
					}
				}
				fs.symlinkSync(src, dest, 'file');
			} catch (err) {
				if (err.code === 'EPERM') {
					console.warn(`[Fallback] Copying instead of linking: ${file}`);
					fs.copyFileSync(src, dest);
				} else {
					console.error(`[Error] Failed to create symlink: ${dest}`, err);
				}
			}
		}

		fs.copyFileSync(manifestSrc, path.join(resourceOut, 'fxmanifest.lua'));
		console.log(`[Linked] ${name}/* → ${resourceOut}`);
	}
}

(async () => {
	await Promise.all(targets.map(target => buildFolder(target)));

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
			if (parts.length < 4) return;

			const [resourceName, , target] = parts;
			if (!targets.includes(target)) return;

			console.log(`[Watch] Changed: ${filePath} → Rebuilding ${resourceName}/${target}`);
			await buildFolder(target, [resourceName]);
		});

		await new Promise(() => { });
	}
})();
