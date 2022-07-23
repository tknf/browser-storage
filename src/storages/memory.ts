import { StorageData, StorageFactory, StorageStrategy } from "../types";
import { createStorage } from "./storage";

export function createMemoryStrategy(): StorageStrategy {
	let uniqueId = 0;
	const map = new Map<string, StorageData>();
	return {
		async createData(data) {
			let id = (++uniqueId).toString();
			map.set(id, data);
			return id;
		},
		async readData(id) {
			if (map.has(id)) {
				let data = map.get(id);
				return data || null;
			}

			return null;
		},
		async updateData(id, data) {
			map.set(id, data);
		},
		async deleteData(id) {
			map.delete(id);
		},
	};
}

export function createMemoryStorage(): StorageFactory {
	const { createData, readData, updateData, deleteData } =
		createMemoryStrategy();
	let uid = 0;

	return {
		async getStorage() {
			const id = `Memory:${uid++}`;
			const data = await readData(id);
			return createStorage(data || {}, id);
		},
		async saveStorage(storage) {
			let { id, data } = storage;
			if (id) {
				await updateData(id, data);
			} else {
				await createData(data);
			}
		},
		async destroyStorage(storage) {
			await deleteData(storage.id);
		},
	};
}
