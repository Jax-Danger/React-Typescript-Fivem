#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function usage() {
	console.error('Usage: yarn newResource <ResourceName>');
	process.exit(1);
}

const [, , resourceName] = process.argv;
if (!resourceName) usage();

// Assume this script lives at the monorepo root (next to tsconfig.json)
const repoRoot = path.resolve(__dirname);
const rootTsconfig = path.join(repoRoot, 'tsconfig.json');
if (!fs.existsSync(rootTsconfig)) {
	console.error(`❌ Cannot find root tsconfig.json at ${rootTsconfig}`);
	process.exit(1);
}

// Where we’ll create packages/<ResourceName>
const packagesDir = path.join(repoRoot, 'packages');
const resourceDir = path.join(packagesDir, resourceName);
const srcDir = path.join(resourceDir, 'src');
if (fs.existsSync(resourceDir)) {
	console.error(`❌ Resource "${resourceName}" already exists at ${resourceDir}`);
	process.exit(1);
}

// 1) scaffold folders
fs.mkdirSync(srcDir, { recursive: true });

// 2) fxmanifest.lua
fs.writeFileSync(
	path.join(resourceDir, 'fxmanifest.lua'),
	`fx_version 'cerulean'
game 'gta5'

client_script 'client/client.js'
server_script 'server/server.js'
shared_script 'shared/shared.js'
`
);

// 3) compute relative path from resourceDir to rootTsconfig
let rel = path.relative(resourceDir, rootTsconfig).replace(/\\\\/g, '/');
if (!rel.startsWith('.')) rel = './' + rel;

// 4) tsconfig.json in the resource root
fs.writeFileSync(
	path.join(resourceDir, 'tsconfig.json'),
	JSON.stringify({
		extends: rel,
		include: ['src/**/*']
	}, null, 2)
);

// 5) scaffold src/{client,server,shared}
for (const slice of ['client', 'server', 'shared']) {
	const sliceDir = path.join(srcDir, slice);
	fs.mkdirSync(sliceDir, { recursive: true });
	const header =
		slice === 'client'
			? `/// <reference types="@citizenfx/client" />\n`
			: slice === 'server'
				? `/// <reference types="@citizenfx/server" />\n`
				: `/// <reference types="../global.d.ts" />\n`;
	fs.writeFileSync(path.join(sliceDir, 'base.ts'), header);
}

// 6) config.ts + global.d.ts
fs.writeFileSync(
	path.join(srcDir, 'config.ts'),
	`// configure this resource at runtime
globalThis.config = {
  resourceName: '${resourceName}',
  enabled: false,
  permissions: ['user'],
  debugMode: false
};
`
);
fs.writeFileSync(
	path.join(srcDir, 'global.d.ts'),
	`interface Config {
  resourceName: string;
  enabled: boolean;
  permissions: string[];
  debugMode?: boolean;
}
declare var config: Config;
`
);

console.log(`✅ Scaffolded resource: packages/${resourceName}`);
