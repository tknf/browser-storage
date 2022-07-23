import { CookieAttributes } from "js-cookie";

export type StorageType = "cookie" | "memory" | "local" | "session";

export type StorageOptions = {
	name: string;
};

export type CookieStorageOptions = StorageOptions &
	CookieAttributes & {
		type: "cookie";
		maxAge?: number;
	};

export type CommonStorageOptions = StorageOptions & {
	type: "memory" | "local" | "session";
};

export type BrowserStorageOptions = CookieStorageOptions | CommonStorageOptions;

export type StorageData = Record<string, any>;

export interface Storage {
	readonly id: string;
	readonly data: StorageData;
	has(name: string): boolean;
	get(name: string): any | null;
	set(name: string, value: any): void;
	flash(name: string, value: any): void;
	unset(name: string): void;
}

export interface StorageStrategy {
	createData(data: StorageData): Promise<string>;
	readData(id: string): Promise<StorageData | null>;
	updateData(id: string, data: StorageData): Promise<void>;
	deleteData(id: string): Promise<void>;
}

export interface StorageFactory {
	getStorage(): Promise<Storage>;
	saveStorage(storage: Storage): Promise<void>;
	destroyStorage(storage: Storage): Promise<void>;
}
