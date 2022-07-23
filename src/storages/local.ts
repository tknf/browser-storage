import { StorageFactory, StorageOptions } from "../types";
import { createStorage } from "./storage";

export function createLocalStorage(options: StorageOptions): StorageFactory {
	const storageKey = `BrowserStorage:${options.name}`;

	return {
		async getStorage() {
			const storageItem = window.localStorage.getItem(storageKey);
			let data: any;
			if (storageItem) {
				try {
					data = JSON.parse(storageItem);
					return createStorage(data);
				} catch {
					return createStorage();
				}
			}
			return createStorage();
		},
		async saveStorage(storage) {
			let { data } = storage;
			try {
				window.localStorage.setItem(storageKey, JSON.stringify(data));
			} catch {
				//
			}
		},
		async destroyStorage(_storage) {
			window.localStorage.removeItem(storageKey);
		},
	};
}
