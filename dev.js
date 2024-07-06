import { spawnSync } from "child_process";
import { resolve, relative, join } from "path";
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

async function buildUI() {
    try {
        console.log("Building UI...");
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
        console.log("UI build completed.");
    } catch (error) {
        console.error("Error building UI:", error);
        process.exit(1);
    }
}

async function runDev() {
    try {
        // Initial builds
        await Promise.all([buildClientAndServer(), buildUI()]);

        // Watch for changes in the resource and web directories
        const watcher = chokidar.watch(
            ["./resource/client/*.ts", "./resource/server/*.ts", "./web/**/*", "./web/**/*.tsx"],
            { persistent: true }
        );

        console.log("Watching for file changes...");

        watcher.on("change", async (path) => {
            console.log(`File ${path} has changed`);
            const resolvedWebPath = resolve("web");
            const resolvedPath = resolve(path);

            if (resolvedPath.startsWith(resolvedWebPath)) {
                await buildUI();
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
