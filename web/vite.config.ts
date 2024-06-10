import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	base: "./",
	build: {
		outDir: "../build/web",
		emptyOutDir: true,
		assetsDir: "./",
		rollupOptions: {
			output: {
				entryFileNames: "js/[name].js",
				chunkFileNames: "js/[name].js",
				assetFileNames: "styles/[name].[ext]",
			},
		},
	}
});