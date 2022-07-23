import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	clearScreen: false,
	resolve: {
		alias: {
			"@tknf/browser-storage": path.resolve(__dirname, "../esm/index.esm.js"),
		},
	},
	server: {
		port: 3000,
	},
});
