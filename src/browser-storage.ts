import { createBrowserStorage } from "./core";

declare global {
	interface Window {
		createBrowserStorage: typeof createBrowserStorage;
	}
}

window.createBrowserStorage = createBrowserStorage;
