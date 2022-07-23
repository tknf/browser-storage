# BrowserStorage

## Browser storage with a simple, lightweight and user-friendly interface.

There are multiple options for storing information in the browser, including `cookie`, `localStorage` and `sessionStorage`.

We have created a wrapper to make them available in common interface and declaratively available based on a single key.

## Usage

### Installation

with NodeJS:
```bash
npm install --save @tknf/browser-storage
# or
yarn add @tknf/browser-storage
```

in Browser:
```html
<script src="https://unpkg.com/@tknf/browser-storage@0.1.1/umd/browser-storage.min.js"></script>
```


### Simple example:
```js
// storage.js
import { createBrowserStorage } from "@tknf/browser-storage";
const { getStorage, saveStorage, destroyStorage } = await createBrowserStorage({
  type: "local",
  name: "MyStorage"
});

const storage = await getStorage();
storage.set("one", "foo");
storage.set("two", { bar: "baz" });
await saveStorage(storage);

const one = storage.get("one"); // "foo"
const two = storage.get("tow"); // { bar: "baz" }
```

## Options
### `type`
Select the type of storage to store the data from `cookie`, `local`, `session`, or `memory`.
Each of the following storage types will be used:

`cookie`  : `document.cookie`
`local`   : `window.localStorage`
`session` : `window.sessionStorage`
`memory`  : `new window.Map()`

### `name`
Specify the cookie name or storage key for storage API.
Multiple values are held as objects in storage using single key.

### `domain`, `expires`, `path`, `sameSite`, `secure`
Cookie options that can be specified only if type is cookie.
See [js-cookie](https://github.com/js-cookie/js-cookie) for available options.

### `maxAge`
A cookie option that can be specified only if type is cookie.
Converts to `expires` by specifying the number of seconds until expiration.
