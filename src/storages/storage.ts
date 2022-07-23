import { Storage, StorageData } from "../types";

function flash(name: string): string {
	return `__flash:${name}`;
}

export function createStorage(
	initialData: StorageData = {},
	id: string = ""
): Storage {
	const map = new Map<string, any>(Object.entries(initialData));

	return {
		get id() {
			return id;
		},
		get data() {
			return Object.fromEntries(map);
		},
		has(name) {
			return map.has(name) || map.has(flash(name));
		},
		get(name) {
			if (map.has(name)) return map.get(name);

			const flashName = flash(name);
			if (map.has(flashName)) {
				const value = map.get(flashName);
				map.delete(flashName);
				return value;
			}

			return null;
		},
		set(name, value) {
			map.set(name, value);
		},
		flash(name, value) {
			map.set(flash(name), value);
		},
		unset(name) {
			map.delete(name);
		},
	};
}

export function isStorage(object: any): object is Storage {
	return (
		object != null &&
		typeof object.id === "string" &&
		typeof object.data !== "undefined" &&
		typeof object.has === "function" &&
		typeof object.get === "function" &&
		typeof object.set === "function" &&
		typeof object.flash === "function" &&
		typeof object.unset === "function"
	);
}
