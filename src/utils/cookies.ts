import Cookies, { CookieAttributes } from "js-cookie";
import { CookieStorageOptions } from "../types";

export function createCookie(cookieOptions: CookieStorageOptions) {
	const { name, ...options } = cookieOptions;

	return {
		get name() {
			return name;
		},
		get expires() {
			return typeof options.maxAge !== "undefined"
				? new Date(Date.now() + options.maxAge * 1000)
				: options.expires;
		},
		async parse() {
			const cookie = Cookies.get(name)?.slice(2);
			let value = {};
			try {
				value = JSON.parse(cookie ?? "{}");
			} catch {
				value = {};
			}
			return value || null;
		},
		async serialize(value: object, setOptions?: CookieAttributes) {
			let valueString = "{}";
			try {
				valueString = JSON.stringify(value);
			} catch {
				valueString = "{}";
			}
			return Cookies.set(name, "j:" + valueString, {
				...options,
				...setOptions,
			});
		},
	};
}
