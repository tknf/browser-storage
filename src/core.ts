import { createCookieStorageFactory } from "./storages/cookie";
import { createFakeStorageFactory } from "./storages/fake";
import { createLocalStorage } from "./storages/local";
import { createMemoryStorage } from "./storages/memory";
import { createSessionStorage } from "./storages/session";
import { BrowserStorageOptions } from "./types";

export function createBrowserStorage(options: BrowserStorageOptions) {
	if (typeof window === "undefined") {
		return createFakeStorageFactory(options);
	}

	if (options.type === "cookie") {
		return createCookieStorageFactory(options);
	} else if (options.type === "local") {
		return createLocalStorage(options);
	} else if (options.type === "session") {
		return createSessionStorage(options);
	} else {
		return createMemoryStorage();
	}
}
