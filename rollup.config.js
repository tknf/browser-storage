import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const date = {
	day: new Date().getDate(),
	month:
		"January February March April May June July August September October November December".split(
			" "
		)[new Date().getMonth()],
	year: new Date().getFullYear(),
};

function banner(name = null) {
	const pkg = require("./package.json");
	return `${`
  /**
   * @LICENSE
   *
   * Browser Storage ${name ? `${name} ` : ""}${pkg.version}
   * ${pkg.description}
   * ${pkg.homepage}
   *
   * Copyright 2021-${date.year} ${pkg.author}
   *
   * Released under the ${pkg.license} License
   *
   * Released on: ${date.month} ${date.day} ${date.year}
   */
  `.trim()}\n`;
}

const createESM = (isProduction) => {
	/**
	 * @type { import("rollup").RollupOptions }
	 */
	const config = {
		input: path.resolve(__dirname, "src/index.ts"),
		output: {
			dir: path.resolve(__dirname, "esm"),
			entryFileNames: `index.esm.js`,
			exports: "named",
			format: "esm",
			externalLiveBindings: false,
			freeze: false,
			sourcemap: true,
			banner: banner(),
		},
		treeshake: {
			moduleSideEffects: "no-external",
			propertyReadSideEffects: false,
			tryCatchDeoptimization: false,
		},
		external: [
			...Object.keys(require("./package.json").dependencies),
			...Object.keys(require("./package.json").devDependencies),
		],
		onwarn(warning, warn) {
			if (warning.message.includes("Package subpath")) {
				return;
			}
			if (warning.message.includes("Use of eval")) {
				return;
			}
			if (warning.message.includes("Circular dependency")) {
				return;
			}
			warn(warning);
		},
		plugins: [
			nodeResolve({ preferBuiltins: true }),
			typescript({
				tsconfig: "./tsconfig.json",
				declaration: true,
				declarationDir: "./esm",
			}),
			isProduction &&
				terser({
					compress: true,
				}),
		],
	};

	return config;
};

const createBundle = (minify) => {
	const name = minify ? "browser-storage.min.js" : "browser-storage.js";
	/**
	 * @type { import("rollup").RollupOptions }
	 */
	const config = {
		input: path.resolve(__dirname, "src/browser-storage.ts"),
		output: {
			file: `./umd/${name}`,
			name,
			format: "umd",
			externalLiveBindings: false,
			freeze: false,
			sourcemap: true,
			banner: banner(),
		},
		treeshake: {
			moduleSideEffects: "no-external",
			propertyReadSideEffects: false,
			tryCatchDeoptimization: false,
		},
		external: [],
		onwarn(warning, warn) {
			if (warning.message.includes("Package subpath")) {
				return;
			}
			if (warning.message.includes("Use of eval")) {
				return;
			}
			if (warning.message.includes("Circular dependency")) {
				return;
			}
			warn(warning);
		},
		plugins: [
			nodeResolve({ preferBuiltins: true }),
			typescript({
				tsconfig: "./tsconfig.umd.json",
				declaration: false,
			}),
			minify &&
				terser({
					format: {
						comments: /@license/i,
					},
				}),
		],
	};

	return config;
};

export default (options) => {
	const isDevelopment = options.watch;
	const isProduction = !isDevelopment;

	return [createESM(isProduction), createBundle(false), createBundle(true)];
};
