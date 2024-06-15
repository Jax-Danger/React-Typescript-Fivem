import { spawnSync } from "child_process";
import { build } from "esbuild";
import { clean } from "esbuild-plugin-clean";
import esbuildPluginTsc from "esbuild-plugin-tsc";
import { resolve } from "path";
import { Rcon } from "rcon-client";

const buildPath = "./build";
const isProduction = process.env.NODE_ENV === "production";

const createBuildSettings = (path) => ({
	entryPoints: [`./resource/${path}/**`],
	outdir: resolve(buildPath, path),
	bundle: true,
	platform: "node",
	target: "node16",
	minify: isProduction,
	sourcemap: false,
	plugins: [
		clean({
			patterns: ["./build/*", "./build/assets/*.map.js"],
			cleanOnStartPatterns: ["./prepare"],
			cleanOnEndPatterns: ["./post"],
		}),
		esbuildPluginTsc({
			tsconfigPath: `./resource/${path}/tsconfig.json`,
			force: true,
		}),
	],
	logLevel: "info",
});

const restartResource = async () => {
	try {
		const rcon = new Rcon({
			host: "127.0.0.1",
			port: 30120,
			password: "root",
		});
		rcon.on("connect", () => console.log("connected"));
		rcon.on("authenticated", () => console.log("authenticated"));
		rcon.on("end", () => console.log("end"));
		await rcon.connect();
		console.log("Connected to RCON");
		await rcon.send("restart");
		console.log("Resource restarted");
	} catch (error) {
		console.error("Failed to restart resource", error);
	}
};

export const buildResource = async () => {
	console.log("Building resource");
	await build(createBuildSettings("server"));
	await build(createBuildSettings("client"));
	// Vite build
	const cwd = resolve("./web");
	console.log(`Building UI in ${cwd}`);
	const result = spawnSync("yarn", ["build"], { cwd: cwd, shell: true });
	console.log(result.stdout.toString());
	await restartResource();
};

buildResource().catch((error) => {
	console.error(error);
	process.exit(1);
});
