import { CookieAttributes } from "js-cookie";
import { CookieStorageOptions, StorageFactory } from "../types";
import { createCookie } from "../utils/cookies";
import { createStorage } from "./storage";

export function createCookieStorageFactory(
	options: CookieStorageOptions
): StorageFactory {
	const cookie = createCookie(options);

	return {
		async getStorage() {
			const data = await cookie.parse();
			return createStorage(data || {});
		},
		async saveStorage(storage, saveOptions?: CookieAttributes) {
			await cookie.serialize(storage.data, {
				...options,
				...saveOptions,
			});
		},
		async destroyStorage(_storage) {
			await cookie.serialize(
				{},
				{
					...options,
					expires: new Date(0),
				}
			);
		},
	};
}
