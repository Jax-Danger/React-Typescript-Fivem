import { spawnSync } from "child_process";
import { resolve } from "path";
import { build } from "esbuild";
import chokidar from "chokidar";

const buildPath = resolve("build");

async function buildClientAndServer() {
	try {
		console.log("Building client and server...");
		await build({
			entryPoints: ["./resource/client/*.ts", "./resource/server/*.ts"],
			outdir: resolve(buildPath),
			bundle: true,
			minify: true,
			platform: "browser",
			target: "es2020",
			logLevel: "info",
		});
		console.log("Client and server build completed.");
	} catch (error) {
		console.error("Error building client and server:", error);
		process.exit(1);
	}
}

async function buildResourceAndUI() {
	try {
		console.log("Building resource & UI...");
		const cwd = resolve("./web");
		console.log(`Building UI in ${cwd}`);
		const result = spawnSync("yarn", ["build"], {
			cwd,
			shell: true,
			stdio: "inherit",
		});
		if (result.error) {
			console.error("Error running yarn build:", result.error);
			process.exit(1);
		}
		console.log("Resource & UI build completed.");
	} catch (error) {
		console.error("Error building resource & UI:", error);
		process.exit(1);
	}
}

async function runDev() {
	try {
		// Initial builds
		await Promise.all([buildClientAndServer(), buildResourceAndUI()]);

		// Watch for changes
		const watcher = chokidar.watch(
			["./resource/client/*.ts", "./resource/server/*.ts", "./web/**/*"],
			{
				persistent: true,
			},
		);

		console.log("Watching for file changes...");

		watcher.on("change", async (path) => {
			console.log(`File ${path} has changed`);
			if (path.startsWith("web")) {
				await buildResourceAndUI();
			} else {
				await buildClientAndServer();
			}
		});
	} catch (error) {
		console.error("Error during development:", error);
		process.exit(1);
	}
}

runDev();
