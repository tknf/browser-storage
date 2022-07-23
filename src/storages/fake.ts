import { StorageFactory, StorageOptions } from "../types";

export function createFakeStorageFactory(
	options: StorageOptions
): StorageFactory {
	return {
		async getStorage() {
			return {
				get id() {
					return "";
				},
				get data() {
					return {};
				},
				get() {
					return null;
				},
				flash() {
					return null;
				},
				set() {},
				unset() {},
				has() {
					return false;
				},
			};
		},
		async saveStorage() {},
		async destroyStorage() {},
	};
}
