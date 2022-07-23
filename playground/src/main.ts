import { createBrowserStorage } from "@tknf/browser-storage";

async function main() {
	const { getStorage, saveStorage, destroyStorage } = createBrowserStorage({
		type: "cookie",
		name: "Test",
	});

	const s = await getStorage();
	s.set("foo", "bar");
	s.set("bar", { foo: "baz" });
	await saveStorage(s);
	console.log(s.data);
}

main();
